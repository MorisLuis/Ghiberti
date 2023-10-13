import { isEmpty } from 'lodash';
import Image from 'next/image';

const CheckoutCartItem = ({ item }: any) => {

	const productImg = item?.images?.[0] ?? '';

	return (
		<tr className="woo-next-cart-item" key={item?.productId ?? ''}>
			<td className="woo-next-cart-element">
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
			<td className="woo-next-cart-element">{item?.currency ?? ''}{item?.price_html ?? ''}</td>
		</tr>
	)
};

export default CheckoutCartItem;
