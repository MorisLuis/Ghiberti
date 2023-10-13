import { CartContext } from '@/context';
import React, { useContext, useState } from 'react';
import Address from './Adress';
import styles from '../../styles/Checkout.module.scss';
import CheckboxField from './CheckboxField';
import { handleBillingDifferentThanShipping, handleOtherPaymentMethodCheckout, handleStripeCheckout, setStatesForCountry } from '@/utils/checkout';
import YourOrder from './YourOrder';
import PaymentModes from './PaymentModes';
import validateAndSanitizeCheckoutForm from '@/validator/Checkout';

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
/* const defaultCustomerInfo = {
    firstName: 'Imran',
    lastName: 'Sayed',
    address1: '123 Abc farm',
    address2: 'Hill Road',
    city: 'Mumbai',
    country: 'IN',
    state: 'Maharastra',
    postcode: '221029',
    email: 'codeytek.academy@gmail.com',
    phone: '9883778278',
    company: 'The Company',
    errors: null,
}; */

const defaultCustomerInfo = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    state: '',
    postcode: '',
    email: '',
    phone: '',
    company: '',
    errors: null
}

export const CheckoutForm = ({ countriesData }: any) => {

    const { billingCountries, shippingCountries } = countriesData || {};

    const initialState = {
        billing: {
            ...defaultCustomerInfo,
        },
        shipping: {
            ...defaultCustomerInfo,
        },
        createAccount: false,
        orderNotes: '',
        billingDifferentThanShipping: false,
        paymentMethod: 'cod',
    };

    const { cart, addProductToCart } = useContext(CartContext);
    const [input, setInput] = useState(initialState);
    const [requestError, setRequestError] = useState(null);
    const [theShippingStates, setTheShippingStates] = useState([]);
    const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(false);
    const [theBillingStates, setTheBillingStates] = useState([]);
    const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
    const [isOrderProcessing, setIsOrderProcessing] = useState(false);
    const [createdOrderData, setCreatedOrderData] = useState({});

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        const billingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm(input?.billing, theBillingStates?.length) : {
            errors: null,
            isValid: true,
        };
        const shippingValidationResult = validateAndSanitizeCheckoutForm(input?.shipping, theShippingStates?.length);

        setInput({
            ...input,
            billing: { ...input.billing, errors: billingValidationResult.errors },
            shipping: { ...input.shipping, errors: shippingValidationResult.errors },
        });

        // If there are any errors, return.
        if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
            return null;
        }

        // For stripe payment mode, handle the strip payment and thank you.
        if ('stripe' === input.paymentMethod) {
            const createdOrderData = await handleStripeCheckout(input, cart, setRequestError, addProductToCart, setIsOrderProcessing, setCreatedOrderData);
            return null;
        }

        // For Any other payment mode, create the order and redirect the user to payment url.
        const createdOrderData = await handleOtherPaymentMethodCheckout(
            input,
            cart,
            setRequestError,
            addProductToCart,
            setIsOrderProcessing,
            setCreatedOrderData
        );

        console.log({createdOrderData})

        /* if (createdOrderData.paymentUrl) {
            window.location.href = createdOrderData.paymentUrl;
        } */

        setRequestError(null);

    };

    const handleOnChange = async (event: any, isShipping = false, isBillingOrShipping = false) => {
        const { target } = event || {};

        if ('createAccount' === target.name) {
            //handleCreateAccount( input, setInput, target );
        } else if ('billingDifferentThanShipping' === target.name) {
            handleBillingDifferentThanShipping( input, setInput, target );
        } else if (isBillingOrShipping) {
            if (isShipping) {
                await handleShippingChange(target);
            } else {
                await handleBillingChange(target);
            }
        } else {
            const newState = { ...input, [target.name]: target.value };
            setInput(newState);
        }

    };


    const handleShippingChange = async (target: any) => {
        const newState = { ...input, shipping: { ...input?.shipping, [target.name]: target.value } };
        setInput(newState);
        await setStatesForCountry({ target, setTheStates: setTheShippingStates, setIsFetchingStates: setIsFetchingShippingStates });
    };

    const handleBillingChange = async (target: any) => {
        const newState = { ...input, billing: { ...input?.billing, [target.name]: target.value } };
        setInput(newState);
        await setStatesForCountry({ target, setTheStates: setTheBillingStates, setIsFetchingStates: setIsFetchingBillingStates });
    };

    return (
        <>
            {
                cart ? (
                    <form onSubmit={handleFormSubmit} className={styles.ChekoutForm}>
                        <div className={styles.content}>
                            <div className={styles.form}>
                                {/*Shipping Details*/}
                                <div>
                                    <h2 style={{marginBottom: "1em"}}>Detalles de envío</h2>
                                    <Address
                                        states={theShippingStates}
                                        countries={shippingCountries}
                                        input={input?.shipping}
                                        handleOnChange={(event) => handleOnChange(event, true, true)}
                                        isFetchingStates={isFetchingShippingStates}
                                        isShipping
                                        isBillingOrShipping
                                    />
                                </div>

                                <div style={{marginBottom: "1em"}}>
                                    <CheckboxField
                                        name="billingDifferentThanShipping"
                                        type="checkbox"
                                        checked={input?.billingDifferentThanShipping}
                                        handleOnChange={handleOnChange}
                                        label="Facturación diferente al envío."
                                        containerClassNames="mb-4 pt-4"
                                    />
                                </div>

                                {/*Billing Details*/}
                                {input?.billingDifferentThanShipping ? (
                                    <div style={{marginBottom: "1em"}} >
                                        <h2 style={{marginBottom: "1em"}}>Detalles de facturación</h2>
                                        <Address
                                            states={theBillingStates}
                                            countries={billingCountries.length ? billingCountries : shippingCountries}
                                            input={input?.billing}
                                            handleOnChange={(event) => handleOnChange(event, false, true)}
                                            isFetchingStates={isFetchingBillingStates}
                                            isShipping={false}
                                            isBillingOrShipping
                                        />
                                    </div>
                                ) : null}
                            </div>

                            {/* Order & Payments*/}
                            <div className={styles.yourOrders}>
                                {/*	Order*/}
                                <h2 className="text-xl font-medium mb-4">Tu orden</h2>
                                <YourOrder cart={cart} />

                                {/*Payment*/}
                                <PaymentModes input={input} handleOnChange={handleOnChange} />

                                <div className="woo-next-place-order-btn-wrap mt-5">
                                    <button
                                        disabled={isOrderProcessing}
                                        type="submit"
                                        className='button'
                                    >
                                        Ordenar
                                    </button>
                                </div>

                                {/* Checkout Loading*/}
                                {isOrderProcessing && <p>Processing Order...</p>}
                                {requestError && <p>Error : {requestError} :( Please try again</p>}
                            </div>
                        </div>
                    </form>
                ) : null}
        </>
    )
}
