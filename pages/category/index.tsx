import Layout from '@/components/Layout'
import { ProductGrid } from '@/components/Products/ProductGrid'
import { getCategories } from '@/utils/services'
import { GetStaticProps } from 'next'
import React from 'react'

const category = ({ products }: any) => {
    return (
        <Layout title="Categorias | Ghiberti" >
            <h1 style={{ padding: "1em 3em 0em 3em" }}>Categorias</h1>
            <ProductGrid products={products} isCategories/>
        </Layout>
    )
}

export default category

export const getStaticProps: GetStaticProps = async () => {


    const { data } = await getCategories();

    return {
        props: {
            headerFooter: {},
            products: data,
            loading: false,
            networkStatus: false,
        },
        revalidate: 1,
    };
};
