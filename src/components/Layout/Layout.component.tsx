// Imports
import { ReactNode } from 'react';
/* import { useQuery } from '@apollo/client';
 */
// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
import Stickynav from '@/components/Footer/Stickynav.component';
import { AppProvider } from '../../../context';

// State
/* import { CartContext } from '@/stores/CartProvider';
 */
// Utils
/* import { getFormattedCart } from '@/utils/functions/functions';
 */
// GraphQL
/* import { GET_CART } from '@/utils/gql/GQL_QUERIES';
 */

interface ILayoutProps {
  children?: ReactNode;
  title: string;
  headerFooter?: any
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({ children, title, headerFooter }: ILayoutProps) => {

  const { header, footer } = headerFooter || {};

  return (
    <>

        <Header title={title} header={header} />

        <PageTitle title={title} />

        {children}

        <Footer footer={footer} />

        <Stickynav />
    </>
  );
};

export default Layout;
