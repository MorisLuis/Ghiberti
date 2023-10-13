import Layout from '@/components/Layout'
import { ProductGrid } from '@/components/Products/ProductGrid'
import { getProductsData } from '@/utils/services'
import axios from 'axios'
import { GetStaticProps } from 'next'
import React from 'react'
import { HEADER_FOOTER_ENDPOINT } from '../utils/endpoints'


const Home = ({
  headerFooter,
  products
}: any) => {
  return (
    <>
      <Layout title="Inicio | Ghiberti" >
        <ProductGrid products={products}/>
      </Layout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {

  const menu  = await axios.get(HEADER_FOOTER_ENDPOINT)
  const headerFooterData = menu.data.data

  //const {data: products}  = await axios.get('http://localhost:3000/api/get-products')
	const { data: products } = await getProductsData();


  return {
    props: {
      headerFooter: headerFooterData ?? {},
      products: products,
      loading : false,
      networkStatus : false,
    },
    revalidate: 1,
  };
};