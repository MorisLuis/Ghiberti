import isEmpty from "@/validator/IsEmpty";
import Axios from "axios";
import { WOOCOMMERCE_STATES_ENDPOINT } from "../endpoints";
import { createTheOrder, getCreateOrderData } from "./order";
import { isArray, isEmpty as isEmptyLoadash } from 'lodash';
import { createCheckoutSession } from 'next-stripe/client'
import { loadStripe } from '@stripe/stripe-js';

/* interface PropsHandleBillingDifferentThanShipping {
	input: any;
	setInput: any;
	target: any;
} */

export const handleBillingDifferentThanShipping = (input, setInput, target) => {
	console.log({target})
	const newState = { ...input, [target?.name]: !input.billingDifferentThanShipping };
	setInput(newState);
};

/* 
interface PropsSetStatesForCountry {
	target: any;
	setTheStates: any;
	setIsFetchingStates: any;
} */

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

/* interface PropsHandleOtherPaymentMethodCheckout {
	input: any;
	products: any;
	setRequestError: any;
	setCart: any;
	setIsOrderProcessing: any;
	setCreatedOrderData: any
} */


export const handleOtherPaymentMethodCheckout = async (input, products, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData) => {
	setIsOrderProcessing(true);
	const orderData = getCreateOrderData(input, products);
	const customerOrderData = await createTheOrder(orderData, setRequestError, '');
	console.log({ customerOrderData })
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

/* 
interface PropsHandleStripeCheckout {
	input: any;
	products: any;
	setRequestError: any;
	setCart: any;
	setIsProcessing: any;
	setCreatedOrderData: any
} */


export const handleStripeCheckout = async (input, products, setRequestError, setCart, setIsProcessing, setCreatedOrderData) => {
	setIsProcessing(true);
	const orderData = getCreateOrderData(input, products);
	const customerOrderData = await createTheOrder(orderData, setRequestError, '');
	/* const cartCleared = await clearCart(setCart, () => {
	}); */
	setIsProcessing(false);

	console.log({customerOrderData})
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

/* interface PropsCreateCheckoutSessionAndRedirect {
	products: any,
	input: any,
	orderId: any
} */

const createCheckoutSessionAndRedirect = async (products, input, orderId) => {
	const priceOne = 18;

	const sessionData = {
		success_url: window.location.origin + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
		cancel_url: window.location.href,
		//customer_email: input.billingDifferentThanShipping ? input?.billing?.email : input?.shipping?.email,
		line_items: [
			{
				quantity: 1,
				name : 'Beanie with Logo',
				images: ['https://via.placeholder.com/150'],
				amount: Math.round(priceOne * 100),
				currency: 'usd',
			},
		],		
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
		return {
			quantity: product?.Piezas ?? 0,
			name: product?.name ?? '',
			images: [product?.images?.[0]?.src ?? '' ?? ''],
			amount: Math.round((product?.line_subtotal ?? 0) * 100),
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