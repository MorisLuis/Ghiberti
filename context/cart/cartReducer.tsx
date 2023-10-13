
import { CartState } from '../index';


type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: any[] }
    | { type: '[Cart] - Update products in cart', payload: any[] }
    | { type: '[Cart] - Change cart quantity', payload: any }
    | { type: '[Cart] - Remove product in cart', payload: any }

    | { type: '[Cart] - Remove All cart', payload: [] }
    | { type: '[Order] - Create order', payload: any }

    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItems?: number;
            total?: number;
            subTotal?: number;
        }
    }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        // Actions to cart
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map((product: any) => {
                    if (product.Codigo !== action.payload.Codigo) return product;
                    return action.payload;
                })
            }

        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter((product: any) => !(product.Codigo === action.payload.Codigo && product.Id_Marca === action.payload.Id_Marca))
            }

        // Cart global actions
        case '[Cart] - Remove All cart':
            return {
                ...state,
                cart: []
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }

}