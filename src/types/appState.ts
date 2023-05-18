
import { Cart } from "./Cart";
import { Product } from "./Product"
import { User } from "./User";

export type AppState = {
    products: Product[];
    cart: Cart[];
    user: User | null;
    loading: boolean;
  };
  