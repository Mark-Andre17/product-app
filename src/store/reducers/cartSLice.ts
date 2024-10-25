import { createSlice } from "@reduxjs/toolkit";
import { AddProductAction, CartState, ChangeProductAction, iCart, RemoveProductAction, UpdateProductAction } from "../../models/cart.model";

const initialState: iCart[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        AddProductToCart(state: CartState, action: AddProductAction) {
            state.push(action.payload)
        },
        UpdateProductInCart(state: CartState, action: UpdateProductAction){
            return state.map((item) => {
                if(item.title === action.payload.title){
                    return {
                        ...item, 
                        count: action.payload.count,
                        price: action.payload.price
                    }
                }
                return item;
            })

        },
        ChangeCountInCart(state: CartState, action: ChangeProductAction){
            return state.map((item) => {
                if(item.title === action.payload.title && item.count > 1){
                    return {
                        ...item, 
                        count: item.count - 1,
                        price: parseFloat((item.price - item.price / item.count).toFixed(2))

                    }
                }
                return item;
            })
            
        },
        RemoveProductFromCart(state: CartState, action: RemoveProductAction) {
            return state.filter(item => item.title !== action.payload.title)
        }
    }  
})
export  const { AddProductToCart, RemoveProductFromCart, UpdateProductInCart, ChangeCountInCart } = cartSlice.actions;
export default cartSlice.reducer;