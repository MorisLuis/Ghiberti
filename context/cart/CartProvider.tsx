import { useContext, useEffect, useReducer, useState } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '../index';

export interface CartState {
    cart: any[];
    numberOfItems: number;
    total: number;
    subTotal: number;

}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    total: 0,

    

}


export const CartProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const [productDelete, setProductDelete] = useState(false)


    useEffect(() => {
        if (Cookie.get('cart') === "[]") return;

        try {
            const cookieProducts: any[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);


    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current: any) => {
            return current?.Piezas + prev;
        }, 0);

        const total = state.cart.reduce((prev, current: any) => {
            return prev + (current?.price_html * current?.Piezas);
        }, 0);


        const subTotal = state.cart.reduce((prev, current: any) => {
            return prev + (current?.price_html * current?.Piezas);
        }, 0);

        const orderSummary = {
            numberOfItems,
            total,
            subTotal
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart])



    const addProductToCart = (product: any) => {
        // Verificar si el producto ya existe en el carrito
        const productInCart = state.cart.find(p => p.id === product.id);
    
        if (!productInCart) {
            // Si el producto no está en el carrito, agrégalo
            const updatedCart = [...state.cart, { ...product, Piezas: 1 }];
            return dispatch({ type: '[Cart] - Update products in cart', payload: updatedCart });
        } else {
            // Si el producto ya está en el carrito, actualiza su cantidad
            const updatedCart = state.cart.map(p => {
                if (p.id === product.id) {
                    return { ...p, Piezas: p.Piezas + 1 };
                }
                return p;
            });
    
            return dispatch({ type: '[Cart] - Update products in cart', payload: updatedCart });
        }
    }

    const addOrderToCart = (products: any[]): Promise<void> => {
        //Simulate a promise to react hot toas. We dont really need a promise.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = true;
                if (isSuccess) {
                    dispatch({ type: '[Cart] - Update products in cart', payload: products });
                    resolve();
                } else {
                    reject(new Error("Something went wrong"));
                }
            }, 2000);
        });
    };

    const removeCartProduct = (product: any) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product.product });
    }

    const removeAllCart = () => {
        dispatch({ type: '[Cart] - Remove All cart', payload: [] });

    }


    return (
        <CartContext.Provider value={{
            ...state,
            productDelete,

            // Methods
            addProductToCart,
            removeCartProduct,
            addOrderToCart,
            removeAllCart,

            setProductDelete,
        }}>
            {children}
        </CartContext.Provider>
    )
};