import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { sanitize } from '../../utils/sanitize';
import styles from '../../styles/Product.module.scss';
import { CartContext } from '@/context/cart/CartContext';
import transformPrice from '@/utils/transformPrice';
import toast from 'react-hot-toast';
import { format } from '@/utils/currency';

export const ProductItem = (product: any) => {

    const { images, name, price_html, slug, id } = product.product
    const image = images?.[0]?.src ?? {};

    const { addProductToCart } = useContext(CartContext)

    const dataProduct = {
        id,
        images,
        name,
        price_html: transformPrice(price_html),
        slug,
        Piezas: 0
    }



    return (
        <div className={styles.product}>
            {/*<Link href={`/product/${slug}`} className={styles.item}>*/}
            <Link href={`#`} className={styles.item}>
                <div className={styles.image}>
                    <Image
                        src={image || ""}
                        alt={name}
                        width={200}
                        height={200}
                    />
                    <button className='button__secondary' onClick={() => {
                        addProductToCart(dataProduct)
                        toast(`Se agrego: ${name}`,
                            {
                                icon: '👏',
                                style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                },
                            }
                        );
                    }}>
                        Comprar
                    </button>
                </div>

                <div className={styles.info}>
                    <h6 className="font-bold uppercase my-2 tracking-0.5px">{name ?? ''}</h6>
                    <div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize(price_html ?? '') }} />
                </div>
            </Link>
        </div>
    )
}
