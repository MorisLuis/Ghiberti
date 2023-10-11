// Components
import Hero from '@/components/Index/Hero.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import Layout from '@/components/Layout/Layout.component';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '@/utils/constants/endpoints';
import { getProductsData } from '@/utils/products';

const Index = ({
  headerFooter,
  products
}: any) => {

  return (
    <Layout title="Ghiberti" headerFooter={headerFooter}>
      <Hero />
      {products && <DisplayProducts products={products} />}
    </Layout>
  )

};

export default Index;

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
