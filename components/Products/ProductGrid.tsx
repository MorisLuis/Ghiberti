import React from 'react';
import { ProductItem } from './ProductItem';
import styles from '../../styles/Product.module.scss';
import { CategoryItem } from '../Categories/CategoryItem';

interface props {
    products: any,
    isCategories?: boolean
}

export const ProductGrid = ({
    products,
    isCategories
}: props) => {
    return (
        <div className={styles.productGrid}>

            {
                isCategories ?
                    products.map((product: any) =>
                        <CategoryItem key={product.id} product={product} />
                    )
                    :
                    products.map((product: any) =>
                        <ProductItem key={product.id} product={product} />
                    )
            }
        </div>
    )
}
