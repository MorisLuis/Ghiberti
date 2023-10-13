import { format } from '@/utils/currency';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import styles from '../../styles/Checkout.module.scss';

const CheckoutCartItem = ({ item }: any) => {

	const productImg = item?.images?.[0] ?? '';

	return (
		<tr className={styles.checkoutCartItem} key={item?.productId ?? ''}>
			<td className={styles.image}>
				<figure >
					<Image
						src={!isEmpty(productImg?.src) ? productImg?.src : ''}
						alt={productImg?.alt ?? ''}
						width={50}
						height={50}
					/>
				</figure>
			</td>
			<td className="woo-next-cart-element">{item?.name ?? ''}</td>
			<td className="woo-next-cart-element">{item?.currency ?? ''}{format(item?.price_html) ?? ''}</td>
		</tr>
	)
};

export default CheckoutCartItem;
