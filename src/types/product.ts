import { Category } from "./Category";

export interface Product {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  creationAt: string
  updatedAt: string
  category: Category
}