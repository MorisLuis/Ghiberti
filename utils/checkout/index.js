import isEmpty from "@/validator/IsEmpty";
import Axios from "axios";
import { WOOCOMMERCE_STATES_ENDPOINT } from "../endpoints";
import { createTheOrder, getCreateOrderData } from "./order";
import { isArray, isEmpty as isEmptyLoadash } from 'lodash';
import { createCheckoutSession } from 'next-stripe/client'
import { loadStripe } from '@stripe/stripe-js';


export const handleBillingDifferentThanShipping = (input, setInput, target) => {
	const newState = { ...input, [target?.name]: !input.billingDifferentThanShipping };
	setInput(newState);
};


export const setStatesForCountry = async (target, setTheStates, setIsFetchingStates) => {
	if ('country' === target.name) {
		setIsFetchingStates(true);
		const countryCode = target[target.selectedIndex].getAttribute('data-countrycode');
		const states = await getStates(countryCode);
		setTheStates(states || []);
		setIsFetchingStates(false);
	}
};

export const getStates = async (countryCode = '') => {

	if (!countryCode) {
		return [];
	}

	const { data } = await Axios.get(WOOCOMMERCE_STATES_ENDPOINT, { params: { countryCode } });

	return data?.states ?? [];
};


export const handleOtherPaymentMethodCheckout = async (input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData) => {
	setIsOrderProcessing(true);
	const orderData = getCreateOrderData(input, products);
	const customerOrderData = await createTheOrder(orderData, setRequestError, '');
	/* const cartCleared = await clearCart(setCart, () => {
	}); */
	setIsOrderProcessing(false);

	if (isEmpty(customerOrderData?.orderId)) {
		setRequestError('Clear cart failed');
		return null;
	}

	setCreatedOrderData(customerOrderData);

	return customerOrderData;
};



export const handleStripeCheckout = async (input, products, setRequestError, setCart, setIsProcessing, setCreatedOrderData) => {
	setIsProcessing(true);
	const orderData = getCreateOrderData(input, products);
	const customerOrderData = await createTheOrder(orderData, setRequestError, '');
	/* const cartCleared = await clearCart(setCart, () => {
	}); */
	setIsProcessing(false);

	if (isEmpty(customerOrderData?.orderId)) {
		setRequestError('Clear cart failed');
		return null;
	}

	console.log('success', customerOrderData)

	// On success show stripe form.
	setCreatedOrderData(customerOrderData);
	await createCheckoutSessionAndRedirect(products, input, customerOrderData?.orderId);

	return customerOrderData;
};

const createCheckoutSessionAndRedirect = async (products, input, orderId) => {
	const priceOne = 18;

	const sessionData = {
		success_url: window.location.origin + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
		cancel_url: window.location.href,
		//customer_email: input.billingDifferentThanShipping ? input?.billing?.email : input?.shipping?.email,
		line_items: getStripeLineItems( products ),	
		//metadata: getMetaData(input, orderId),
		payment_method_types: ['card'],
		mode: 'payment',
	};
	console.log('sessionData', sessionData);
	let session = {};
	try {
		session = await createCheckoutSession(sessionData);
		console.log({session})
	} catch (err) {
		console.log('createCheckout session error', err);
	}
	try {
		const stripe = await loadStripe('pk_test_51KRmfIDppGx55DVjpVw3y3j1XyoogF5Eg8r0o1SISlVXTj0uiYpo0f8vUvWikvMVRQqWSqqWq9E9nLA1iVcBGmM900YqEMKANM');
		if (stripe) {
			stripe.redirectToCheckout({ sessionId: session.id });
		}
	} catch (error) {
		console.log(error);
	}
};


const getStripeLineItems = (products) => {
	if (isEmptyLoadash(products) && !isArray(products)) {
		return [];
	}

	return products.map((product) => {
		console.log({product})
		return {
			quantity: product?.Piezas ?? 0,
			name: product?.name ?? '',
			images: [product?.images?.[0]?.src ?? '' ?? ''],
			amount: product.price_html,
			currency: 'usd',
		};
	});
};

export const getMetaData = (input, orderId) => {

	return {
		billing: JSON.stringify(input?.billing),
		shipping: JSON.stringify(input.billingDifferentThanShipping ? input?.billing?.email : input?.shipping?.email),
		orderId,
	};

};