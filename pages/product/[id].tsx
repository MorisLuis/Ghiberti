import Layout from '@/components/Layout';
import ProductDetails from '@/components/Products/ProductDetails';
import { getProductById } from '@/utils/services';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../styles/ProductPage.module.scss';

interface Props {
    product: any[]
}

const ProductDetail: NextPage<Props> = (product) => {
    const { back } = useRouter();

    return (
        <Layout title="Categorias | Ghiberti" >
            <div className={styles.ProductPage}>
                <p className={styles.back} onClick={() => back()}>
                    Regresar
                </p>
                <ProductDetails product={product.product}/>
            </div>
        </Layout>
    )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as any
    let product = {} as any

    if (id) {
        const { data } = await getProductById(id as string);
        product = data
    }

    return {
        props: {
            product,
        }
    };
};
