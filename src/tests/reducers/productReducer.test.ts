
import { createNewProduct, emptyProductsReducer, fetchAllProducts, } from "../../redux/reducers/productsReducer"

import { newProduct } from "../data/products"
import productServer from "../servers/productsServer"
import store from "../shared/store"

beforeEach(() => {
    store.dispatch(emptyProductsReducer)
})
beforeAll(()=>{
    productServer.listen()
})
afterAll(()=>{
    productServer.close()
})
describe("Test productsReducer",()=>{
    test("Check initialState",()=>{
        expect(store.getState().productsReducer).toEqual({
            loading: false,
            error: "",
            products: []
        })
    })
    test("Check fetchAllProducts", async()=>{
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBe(4)
    })
    test("Check if a new Product is created", async () => {
        await store.dispatch(createNewProduct(newProduct))
        expect(store.getState().productsReducer.products.length).toBe(1)
    })
})