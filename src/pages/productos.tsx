// Components
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import Layout from '@/components/Layout/Layout.component';
import axios from 'axios';

// GraphQL
/* import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';
 */
// Utilities
/* import client from '@/utils/apollo/ApolloClient';
 */
// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { HEADER_FOOTER_ENDPOINT } from '@/utils/constants/endpoints';

/**
 * Displays all of the products.
 * @function HomePage
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Produkter: NextPage = ({
  headerFooter
}: any) => (
  <Layout title="Productos" headerFooter={headerFooter}>
    {/* {products && <DisplayProducts products={products} />} */}
  </Layout>
);

export default Produkter;


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
