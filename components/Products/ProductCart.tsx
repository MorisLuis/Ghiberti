import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import Image from 'next/image';
import React, { useContext } from 'react';
import styles from '../../styles/Product.module.scss';

export const ProductCart = (product: any) => {

    const { images, name, price_html: price, Piezas } = product.product
    const imageSource = images?.[0]?.src
    const { removeCartProduct } = useContext(CartContext)


    return (
        < div className={styles.productCart}>
            <section className={styles.image}>
                <Image
                    src={imageSource || ""}
                    alt={name}
                    width={200}
                    height={200}
                />
            </section>
            <section className={styles.info}>
                <h4>{name}</h4>
                <p>{format(price)}</p>
                <p>{Piezas}</p>
                <button className={styles.button} onClick={() => removeCartProduct(product)}>Eliminar</button>
            </section>
        </div >
    )
}
