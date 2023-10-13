import React from 'react';
import { ProductItem } from './ProductItem';
import styles from '../../styles/Product.module.scss';

export const ProductGrid = ({products} : any) => {
    return (
        <div className={styles.productGrid}>
            {
                products.map((product : any) => 
                    <ProductItem key={product.id} product={product}/>
                )
            }
        </div>
    )
}
