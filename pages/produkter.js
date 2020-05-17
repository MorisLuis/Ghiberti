import { request } from 'graphql-request';
import useSWR from 'swr';

import Header from 'components/Header/Header.component';
import IndexProducts from 'components/Main/IndexProducts.component';

import { FETCH_ALL_PRODUCTS_QUERY } from 'const/GQL_QUERIES';
import { WOO_CONFIG } from 'config/nextConfig';

function HomePage() {
  const { data, error } = useSWR(FETCH_ALL_PRODUCTS_QUERY, (query) =>
    request(WOO_CONFIG.GRAPHQL_URL, query)
  );

  return (
    <>
      <Header />
      {data ? (
        <IndexProducts products={data} />
      ) : (
        <div className="mt-8 text-2xl text-center">Laster produkter ...</div>
      )}
      {/* Display error message if error occured */}
      {error && (
        <div className="mt-8 text-2xl text-center">
          Feil under lasting av produkter ...
        </div>
      )}
    </>
  );
}

export default HomePage;