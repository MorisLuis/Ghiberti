import { CartContext } from '@/context'
import { sanitize } from '@/utils/sanitize'
import Image from 'next/image'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import styles from '../../styles/Product.module.scss';
const ProductDetails = ({
    product
}: any) => {

    const { addProductToCart } = useContext(CartContext);
    const { images, name, description, price_html } = product;

    return (
        <div className={styles.ProductDetail}> 
            <section className={styles.image}>
                <Image
                    src={images[0].src || ""}
                    alt={name}
                    width={200}
                    height={200}
                />
            </section>
            <section className={styles.information}>
                <h1>{name}</h1>
                <h3 className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize(price_html ?? '') }} />
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize(description ?? '') }} />

                <div className={styles.buy}>
                    <button className='button'
                        onClick={(e) => {
                            e.preventDefault()
                            addProductToCart(product)
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
            </section>
        </div>
    )
}

export default ProductDetails
