const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
import { isEmpty } from 'lodash';

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});


export default async function handler(req: any, res: any) {

    const responseData: any = {
        success: false,
        orderId: '',
        total: '',
        currency: '',
        error: '',
    };

    if (isEmpty(req.body)) {
        responseData.error = 'Required data not sent';
        return responseData;
    }

    const data = req.body;
    data.status = 'pending';
    data.set_paid = false;

    try {
        const { data } = await api.post(
            'orders',
            req.body,
        );

        responseData.success = true;
        responseData.orderId = data.number;
        responseData.total = data.total;
        responseData.currency = data.currency;
        responseData.paymentUrl = data.payment_url;

        res.json(responseData);

    } catch (error: any) {
        console.log('error', error);

        responseData.error = error.message;
        res.status(500).json(responseData);
    }
}
