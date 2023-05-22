import ProductsInCart from "./ProductsInCart";

export interface ShopCart{
  id: string,
  creationAt:string,
  updateAt:string,
  productsInCart:ProductsInCart[]
  }
  