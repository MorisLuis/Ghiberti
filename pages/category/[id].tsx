import Layout from '@/components/Layout'
import { ProductGrid } from '@/components/Products/ProductGrid';
import { getProductFromCategory } from '@/utils/services';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import styles from '../../styles/CategoryPage.module.scss';

interface Props {
    products: any[]
}

const ProductFromCategory: NextPage<Props> = ({ products }) => {

    const {back} = useRouter();
    const category = products[0].categories[0].name

    return (
        <Layout title={`${category} | Ghiberti`} >
            <div className={styles.CategoryPage}>
                <p className={styles.back}  onClick={() => back()}>
                    Regresar
                </p>
                <h1 className={styles.title}>{category}</h1>
                <ProductGrid products={products} />
            </div>
        </Layout>
    )
}

export default ProductFromCategory;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as any
    let products = {} as any

    if (id) {
        const { data } = await getProductFromCategory(id as string);
        products = data
    }

    console.log({products})

    return {
        props: {
            products,
        }
    };
};

