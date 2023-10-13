import { isArray, isEmpty } from 'lodash';

export const getCreateOrderLineItems = (products: any) => {

    console.log({ products })

    if (isEmpty(products) || !isArray(products)) {
        return [];
    }

    return products?.map(
        ({ id, Piezas }) => {
            return {
                quantity: Piezas,
                product_id: id,
                // variation_id: '', // @TODO to be added.
            };
        },
    );
};

export const getCreateOrderData = (order: any, products: any) => {
    // Set the billing Data to shipping, if applicable.
    const billingData = order.billingDifferentThanShipping ? order.billing : order.shipping;


    // Checkout data.
    return {
        shipping: {
            first_name: order?.shipping?.firstName,
            last_name: order?.shipping?.lastName,
            address_1: order?.shipping?.address1,
            address_2: order?.shipping?.address2,
            city: order?.shipping?.city,
            country: order?.shipping?.country,
            state: order?.shipping?.state,
            postcode: order?.shipping?.postcode,
            email: order?.shipping?.email,
            phone: order?.shipping?.phone,
            company: order?.shipping?.company,
        },
        billing: {
            first_name: billingData?.firstName,
            last_name: billingData?.lastName,
            address_1: billingData?.address1,
            address_2: billingData?.address2,
            city: billingData?.city,
            country: billingData?.country,
            state: billingData?.state,
            postcode: billingData?.postcode,
            email: billingData?.email,
            phone: billingData?.phone,
            company: billingData?.company,
        },
        payment_method: order?.paymentMethod,
        payment_method_title: order?.paymentMethod,
        line_items: getCreateOrderLineItems(products),
    };
};

export const createTheOrder = async (orderData: any, setOrderFailedError: any, previousRequestError: any) => {
    let response: any = {
        orderId: null,
        total: '',
        currency: '',
        error: '',
    };

    // Don't proceed if previous request has error.
    if (previousRequestError) {
        response.error = previousRequestError;
        return response;
    }

    setOrderFailedError('');


    try {
        const request = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        console.log({request})
        const result = await request.json();
        console.log({result})

        if (result.error) {
            response.error = result.error;
            setOrderFailedError('Something went wrong. Order creation failed. Please try again');
        }
        response.orderId = result?.orderId ?? '';
        response.total = result.total ?? '';
        response.currency = result.currency ?? '';
        response.paymentUrl = result.paymentUrl ?? '';

    } catch (error: any) {
        // @TODO to be handled later.
        console.warn('Handle create order error', error?.message);
    }

    return response;
};