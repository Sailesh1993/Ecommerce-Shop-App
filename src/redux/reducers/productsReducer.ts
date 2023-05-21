import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
        createProduct: (state, action:PayloadAction<Product>)=>{
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<number>)=>{
            const id = action.payload
            return{
                ...state,
                products: state.products.filter(product =>product.id !==id)
            }
        },
        emptyProductsReducer: (state)=>{
            return{
                ...state,
                products:[]
            }
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            return {
                ...state,
                products: state.products.map(product => 
                    product.id !== action.payload.id ? product : action.payload)
            }
        },
        sortProductsByPrice: (state, action: PayloadAction<string>)=>{
            if(action.payload === "dsc"){
                state.products.sort((a,b)=> b.price - a.price)
            }
            else if(action.payload === "asc"){
                state.products.sort((a,b)=> a.price - b.price)
            }
        }
    }, 
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
export const 
    {
        createProduct,
        removeProduct,
        emptyProductsReducer,
        updateProduct,
        sortProductsByPrice
    } = productsSlice.actions
const productsReducer = productsSlice.reducer
export default productsReducer