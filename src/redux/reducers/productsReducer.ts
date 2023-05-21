import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";

interface ProductReducer{
    loading: boolean
    error: string
    products: Product[]
}
const initialState: ProductReducer ={
    loading: false,
    error: "",
    products: []
} 
/**
 * This function will read products from api and apply the data to the state
 */
export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async()=>{
        try{
            const result = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")
            return result.data
        }
        catch(e){
            const error = e as AxiosError
            return error.message
        }
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
    }, // List of methods to modify state
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending,(state, action) =>{
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected,(state,action) =>{
                state.loading = false
                state.error = "Cannot perform this action. Please try again later"
            })
            .addCase(fetchAllProducts.fulfilled,(state, action)=>{
                state.loading = false
                if(typeof action.payload === "string"){
                    state.error = action.payload
                }else{
                    state.products = action.payload
                }
            })
    } 
})
const productsReducer = productsSlice.reducer
export default productsReducer