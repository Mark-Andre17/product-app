import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../models/product.model";

export const fetchProducts = createAsyncThunk<IProduct[], undefined, {rejectValue: string}>(
    "products/fetchProducts",
    async function(_, {rejectWithValue}){
        const url = 'https://fakestoreapi.com/products';
        const response = await axios.get(url);
        if(response.status !== 200){
            return rejectWithValue('Server Error')
        }
        return await response.data
    }
)

