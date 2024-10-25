import { PayloadAction } from "@reduxjs/toolkit";

interface iCart{
    count: number,
    title: string,
    price: number
}

enum ECartActions {
    AddProductToCart = 'ADD_PRODUCT_TO_CART',
    RemoveProductFromCart = 'REMOVE_PRODUCT_FROM_CART',
    UpdateProductInCart = 'UPDATE_PRODUCT_IN_CART'
}
type CartState = iCart[];

interface AddProductAction extends PayloadAction<iCart>{};

interface UpdateProductAction extends PayloadAction<iCart>{};

interface ChangeProductAction {
    type: string;
    payload: {
        title: string;
    };
}

interface RemoveProductAction extends PayloadAction<{title: string}>{};

export type { 
    iCart, 
    CartState, 
    AddProductAction, 
    UpdateProductAction, 
    ChangeProductAction, 
    RemoveProductAction 
};

export default ECartActions;
