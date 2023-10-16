import InfiniteSlider from '@/components/InfiniteSlider';
import Layout from '@/components/Layout';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { getProductsData } from '@/utils/services';
import { GetStaticProps } from 'next';
import React from 'react';
import styles from '../styles/Home.module.scss';

const Home = ({
  headerFooter,
  products
}: any) => {
  return (
    <>
      <Layout title="Inicio | Ghiberti" >
        <>
          <video src="/video.mp4" playsInline muted autoPlay loop className={styles.banner}/>

          <h1 style={{ padding:"1em 3em 1em 3em"}}>Productos</h1>
          <InfiniteSlider
            products={products}
          />
          {/* <ProductGrid products={products} /> */}
        </>

      </Layout>
    </>
  )
}

export default Home

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