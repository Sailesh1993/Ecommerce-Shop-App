import NewProduct from "../../types/NewProduct";
import { Product } from "../../types/Product";
import { ProductUpdate } from "../../types/ProductUpdate";
import { category1,category2,category3} from "./categories";

const product1: Product ={
    id: 1,
    title: "Addidas sneakers",
    description: "fancy sneaker",
    price: 50,
    images: [''],
    creationAt: "9.02.2021",
    updatedAt: "24.02.2023",
    category: category1
}
const product2: Product ={
    id: 2,
    title: "Nike sneakers",
    description: "cool sneaker",
    price: 50,
    images: [''],
    creationAt: "9.03.2023",
    updatedAt: "24.03.2023",
    category: category2
}
const product3: Product ={
   id: 3,
    title: "Nike sneakers",
    description: "cool sneaker",
    price: 50,
    images: [''],
    creationAt: "9.03.2023",
    updatedAt: "24.03.2023",
    category: category3
}
const newProduct1: NewProduct = {
    title: "product1",
    price: 30,
    description: "new product1",
    images: [""],
    categoryId: 1
}

const newProduct2: NewProduct = {
    title: "product2",
    price: 40,
    description: "new product2",
    images: [""],
    categoryId: 2
}

const invalidProduct: NewProduct = {
    title: "product1 invalid",
    price: 10,
    description: "new product",
    images: [],
    categoryId: 3
}

const updateProduct: ProductUpdate = {
    id: 7,
    update: {
    title: "Updated Product",
    price: 20
    }
}
export const products = [product1,product2,product3 ,newProduct1, newProduct2,updateProduct,invalidProduct]
export {product1,product2,product3, newProduct1, newProduct2,updateProduct,invalidProduct}
