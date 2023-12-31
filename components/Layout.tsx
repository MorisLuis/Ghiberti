import Head from 'next/head';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Header from './Header';

interface props {
    title: string;
    children: ReactNode
}

const Layout = ({
    title,
    children
}: props) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/G-GHIBERTI.ico" />
            </Head>

            <Header />

            {children}

            <Footer />

            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </>
    )
}

export default Layout
