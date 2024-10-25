import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../models/product.model";

export const addProduct = createAsyncThunk<IProduct, IProduct, {rejectValue: string}>(
    "products/addProduct",
    async function(inputValue, {rejectWithValue}){
        const url = 'https://fakestoreapi.com/products';
        const response = await axios.post(url, inputValue);
        if(response.status !== 200){
            return rejectWithValue('Server Error')
        }
        return response.data
    }
)