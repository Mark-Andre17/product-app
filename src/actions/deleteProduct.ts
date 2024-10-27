import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../models/product.model";

export const deleteProducts = createAsyncThunk<IProduct[],number | undefined, {rejectValue: string}>(
    "products/deleteProducts",
    async function(id: number | undefined, {rejectWithValue}){
        if (!id) {
            return rejectWithValue("Id is required");
        }
        const url = `https://fakestoreapi.com/products/${id}`;
        const response = await axios.delete(url);
        if(response.status !== 200){
            return rejectWithValue('Server Error')
        }
        return await response.data
    }
);
