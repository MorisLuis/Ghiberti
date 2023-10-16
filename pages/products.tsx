import Layout from '@/components/Layout'
import { ProductGrid } from '@/components/Products/ProductGrid';
import { getProductsData } from '@/utils/services';
import {  GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../styles/CategoryPage.module.scss';

interface Props {
    products: any[]
}

const ProductsPage: NextPage<Props> = ({ products }) => {

    const { back } = useRouter();

    return (
        <Layout title={`Productos | Ghiberti`} >
            <div className={styles.CategoryPage}>
                <p className={styles.back} onClick={() => back()}>
                    Regresar
                </p>
                <h1 className={styles.title}>Productos</h1>
                <ProductGrid products={products} />
            </div>
        </Layout>
    )
}

export default ProductsPage;

export const getStaticProps: GetStaticProps = async () => {

    /* const menu  = await axios.get(HEADER_FOOTER_ENDPOINT)
    const headerFooterData = menu.data.data */

    const { data: products } = await getProductsData();


    return {
        props: {
            headerFooter: {},
            products: products,
            loading: false,
            networkStatus: false,
        },
        revalidate: 1,
    };
};

