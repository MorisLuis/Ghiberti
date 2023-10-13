import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import Layout from '@/components/Layout';
import { HEADER_FOOTER_ENDPOINT, WOOCOMMERCE_COUNTRIES_ENDPOINT } from '@/utils/endpoints';
import Axios from 'axios';
import React from 'react'
import styles from '../styles/Checkout.module.scss';

const Checkout = ({ headerFooter, countries }:any) => {
    return (
        <Layout title="Checkout">
            <div className={styles.Checkout}>
                <h2 style={{marginBottom: "1em"}}>Checkout</h2>
                <CheckoutForm countriesData={countries}/>
            </div>
        </Layout>
    )
};

export default Checkout;

export async function getStaticProps() {

    //const { data: headerFooterData } = await Axios.get(HEADER_FOOTER_ENDPOINT);
    const { data: countries } = await Axios.get(WOOCOMMERCE_COUNTRIES_ENDPOINT);


    return {
        props: {
            headerFooter:   {},
            countries: countries || {}
        },
        revalidate: 1,
    };
}
