import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../actions/fetchProducts";
import { IProductState } from "../../models/product.model";
import { addProduct } from "../../actions/postProduct";


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
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [action.payload, ...state.products]
            })
        } 
});
export default productSlice.reducer;