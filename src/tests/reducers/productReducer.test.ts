
import { createNewProduct, emptyProductsReducer, fetchAllProducts, } from "../../redux/reducers/productsReducer"
import { invalidProduct } from "../data/product"

import store from "../shared/store"

beforeEach(() => {
    store.dispatch(emptyProductsReducer)
})
describe("Testing productsReducer",()=>{
    test("check initialState",()=>{
        expect(store.getState().productsReducer).toEqual({
            loading: false,
            error: "",
            products: []
        })
    })
    test("Check fetchAllProducts", async()=>{
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBe(204)
    })
    test("Check should  create new Product", async()=>{
        await store.dispatch(createNewProduct(invalidProduct))
        expect(store.getState().productsReducer.products.length).toBe(204)
    })
})