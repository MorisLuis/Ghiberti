import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import styles from '../../styles/Product.module.scss';

export const CategoryItem = (product: any) => {

    
    const { image, name, slug, id } = product.product
    
    const imageSource = image.src ?? {};

    console.log({imageSource})
    
    return (
        <div className={styles.product}>
            <Link href={`/category/${id}`} className={styles.item}>
                <div className={styles.image}>
                    <Image
                        src={imageSource || ""}
                        alt={name}
                        width={200}
                        height={200}
                        priority
                    />
                </div>
                <div className={styles.info}>
                    <h6 className="font-bold uppercase my-2 tracking-0.5px">{name ?? ''}</h6>
                </div>
            </Link>
        </div>
    )
}
