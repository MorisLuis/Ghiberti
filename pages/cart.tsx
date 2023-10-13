import Layout from '@/components/Layout'
import { ProductCart } from '@/components/Products/ProductCart';
import { CartContext } from '@/context';
import { HEADER_FOOTER_ENDPOINT } from '@/utils/endpoints';
import Axios from 'axios';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useContext } from 'react'
import styles from '../styles/Cart.module.scss';

const Cart = ({
    headerFooter
}: any) => {

    const { cart, total } = useContext(CartContext);

    return (
        <>
            <Layout title="Carrito | Ghiberti" >
                <div className={styles.Cart}>
                    <section className={styles.products}>
                        {
                            cart.map((item: any, index: number) => (
                                <ProductCart key={item.id} product={item} />
                            ))
                        }
                    </section>
                    <section className={styles.checkout}>
                        <div className={styles.content}>
                            <section className={styles.info}>
                                <h3>Carrito Total</h3>
                                <p>$ {total} MXN</p>
                            </section>

                            <section className={styles.link}>
                                <Link href='/checkout' className='button'>
                                    Comprar
                                </Link>
                            </section>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default Cart


export const getStaticProps: GetStaticProps = async () => {

    const menu = await Axios.get(HEADER_FOOTER_ENDPOINT)
    const headerFooterData = menu.data.data


    return {
        props: {
            headerFooter: headerFooterData ?? {},
        },
        revalidate: 1,
    };
};