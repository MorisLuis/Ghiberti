import { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';

import Categories from '@/components/Category/Categories.component';
import Layout from '@/components/Layout/Layout.component';
import axios from 'axios';
import { HEADER_FOOTER_ENDPOINT } from '@/utils/constants/endpoints';


/**
 * Category page displays all of the categories
 */
const Kategorier: NextPage = ({
  headerFooter
}: any)=> (
  <Layout title="Categorias" headerFooter={headerFooter}>
    {/* {categories && <Categories categories={categories} />} */}
    <p>categorias</p>
  </Layout>
);

export default Kategorier;

export const getStaticProps: GetStaticProps = async () => {

  const menu  = await axios.get(HEADER_FOOTER_ENDPOINT)
  const headerFooterData = menu.data.data

  return {
    props: {
      //products: data.products.nodes,
      headerFooter: headerFooterData ?? {},
      products: [],
      loading : false,
      networkStatus : false,
    },
    revalidate: 1,
  };
};
