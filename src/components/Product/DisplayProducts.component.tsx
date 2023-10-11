/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';
import ImageComponent from '../../components/Image/image';
import Image from 'next/image';

import AddToCart from '../../components/Cart/add-to-cart';
import { viewCart } from '@/utils/cart';

interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const DisplayProducts = ({ products }: IDisplayProductsProps) => {


  return (
    <section className="container mx-auto bg-white">
      <div id="product-container" className="flex flex-wrap items-center">
        {
          products ? (products.map((item: any) => {

            const image = item.images?.[0]?.src ?? {};

            return (
              <div
                key={uuidv4()}
                className="flex flex-col p-6 md:w-1/2 xl:w-1/4"
              >
                <Link
                  //href={`/produkt/${encodeURIComponent(item.slug,)}?id=${encodeURIComponent(item.databaseId)}`}
                  href={`#`}

                >
                  <span>
                    {
                      item.images &&

                      <Image
                        src={image || ""}
                        alt="photo"
                        width={200}
                        height={200}
                      />
                    }
                  </span>
                </Link>

                <Link
                  /* href={`/produkt/${encodeURIComponent(
                    item.slug,
                  )}?id=${encodeURIComponent(item.databaseId)}`} */
                  href={`#`}
                >
                  <span>
                    <div className="flex justify-center pt-3">
                      <p className="font-bold text-center cursor-pointer">
                        {item.name}
                      </p>
                    </div>
                  </span>
                </Link>
                {/* Display sale price when on sale */}
                {item.onSale && (
                  <div className="flex justify-center">
                    <div className="pt-1 text-gray-900">
                      {item.variations && filteredVariantPrice(item.price, '')}
                      {!item.variations && item.salePrice}
                    </div>
                    <div className="pt-1 ml-2 text-gray-900 line-through">
                      {item.variations && filteredVariantPrice(item.price, 'right')}
                      {!item.variations && item.regularPrice}
                    </div>
                  </div>
                )}
                {/* Display regular price when not on sale */}
                {!item.onSale && (
                  <p className="pt-1 text-center text-gray-900">{item.price}</p>
                )}

                <AddToCart product={item}/>
                {/* <button onClick={ ( ) => viewCart() }>Ver</button> */}
              </div>
            );
          },
          )
          ) : (
            <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
              Ingen produkter funnet
            </div>
          )}
      </div>
    </section>
  )
};

export default DisplayProducts;
