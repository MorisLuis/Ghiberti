import { createContext, Dispatch, SetStateAction } from 'react';


interface ContextProps {
    cart: any[];
    numberOfItems: number;
    total: number;
    subTotal: number;
    productDelete: boolean;

    // Methods
    addProductToCart: (product: any) => void;
    removeCartProduct: (product: any) => void;
    addOrderToCart: (product: any[]) => Promise<unknown>
    removeAllCart: () => void;

    setProductDelete: Dispatch<SetStateAction<boolean>>;

}


export const CartContext = createContext({} as ContextProps );