import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../actions/fetchProducts";
import { IProductState } from "../../models/product.model";
import { addProduct } from "../../actions/postProduct";
import { deleteProducts } from "../../actions/deleteProduct";


const initialState: IProductState = {
    products: [],
    loading: false,
    error: null
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state: IProductState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state: IProductState, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addProduct.pending, (state: IProductState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state: IProductState, action) => {
                state.loading = false;
                state.products = [action.payload, ...state.products];
            })
            .addCase(deleteProducts.fulfilled, (state: IProductState, action) => {
                const id = action.meta.arg;
                console.log(id);
                
                state.products = state.products.filter((product) => product.id !== id);
            })
        } 
});
export default productSlice.reducer;