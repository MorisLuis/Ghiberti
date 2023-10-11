import Head from 'next/head';

import Navbar from './Navbar.component';

interface IHeaderProps {
  title: string;
  header: any
}

/**
 * Renders header for each page.
 * @function Header
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Header = ({ title, header }: IHeaderProps) => {

const { headerMenuItems } = header
  return (
    <>
      <Head>
        <title>Next.js webshop with WooCommerce {title}</title>
        <meta name="description" content="WooCommerce webshop" />
        <meta name="keywords" content="Ecommerce, WooCommerce" />
        <meta
          property="og:title"
          content="Nextjs Ecommerce with Woocommerce"
          key="pagetitle"
        />
      </Head>
      <Navbar header={header}/>
    </>
  )
};

export default Header;
