import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import styles from '../../styles/Product.module.scss';

export const CategoryItem = (product: any) => {

    console.log({product: product.product})
    const { image, name, slug, id } = product.product


    return (
        <div className={styles.product}>
            <Link href={`/category/${id}`} className={styles.item}>
                <div className={styles.image}>
                    <Image
                        src={image.src || ""}
                        alt={name}
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.info}>
                    <h6 className="font-bold uppercase my-2 tracking-0.5px">{name ?? ''}</h6>
                </div>
            </Link>
        </div>
    )
}
