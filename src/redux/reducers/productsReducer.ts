import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import CreateProduct from "../../types/NewProduct";
import { ProductUpdate } from "../../types/ProductUpdate";
import NewProduct from "../../types/NewProduct";


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
            console.log(result.data)
            return result.data
            
        }
        catch(e){
            const error = e as AxiosError
            return error.message
        }
    }
)

fetchAllProducts()
export const createNewProduct = createAsyncThunk(
    'createNewProduct',
    async (product: NewProduct)=>{
        try{
            const result = await axios.post<Product>("https://api.escuelajs.co/api/v1/products",product)
            return result.data
        }
        catch(e){
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)
export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (productId: number)=>{
        try{
            const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
            return result.data
        }
        catch(e){
            const error = e as AxiosError
            return error.message
        }
    }
)
export const updateExistingProduct = createAsyncThunk(
    "updateProduct",
    async(product: ProductUpdate) =>{
        try{
            const result = await axios.put<Product>(`https://api.escuelajs.co/api/v1/products/${product.id}`,product)
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
        emptyProductsReducer: (state)=>{
            return initialState
        },
        sortProductsByPrice: (state, action: PayloadAction<string>)=>{
            if(action.payload === "dsc"){
                state.products.sort((a,b)=> b.price - a.price)
            }
            else if(action.payload === "asc"){
                state.products.sort((a,b)=> a.price - b.price)
            }
        },
        sortProductsByCategory: (state, action: PayloadAction<string>)=>{
            state.products.sort((a, b) => {
                if (action.payload === "dsc") {
                    return a.category.name.localeCompare(b.category.name)
                }
                else {
                    return b.category.name.localeCompare(a.category.name)
                }
            })
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
            .addCase(createNewProduct.pending,(state,action)=>{
                state.loading = true
                state.error =""
            })
            .addCase(createNewProduct.rejected,(state,action)=>{
                state.error = "Error adding new product"
                state.loading = false
            })
            .addCase(createNewProduct.fulfilled, (state,action)=>{
                
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products.push(action.payload)
                }   
                state.loading = false
            })
            .addCase(updateExistingProduct.pending, (state,action)=>{
                state.loading = true
            })
            .addCase(updateExistingProduct.fulfilled,(state,action)=>{
                state.loading = false
                if(typeof action.payload === "string"){
                    state.error = action.payload
                }
                else if ((action.payload as Product).id){
                    const updatedId = state.products.findIndex((product) =>product.id === (action.payload as Product).id)
                    if (updatedId !== -1) {
                        state.products[updatedId] = action.payload as Product
                    }
                }
            })
            .addCase(updateExistingProduct.rejected, (state) =>{
                state.error = "error updating product"
                state.loading = false
            })
            .addCase (deleteProduct.fulfilled, (state, action) => {
                state.products.filter((product) => product.id !== action.payload.id)
            })
    } 
})
export const {emptyProductsReducer,sortProductsByPrice,sortProductsByCategory} = productsSlice.actions
const productsReducer = productsSlice.reducer
export default productsReducer 


