import { CartItem } from "./cart";
import { Product } from "./product";
import { User } from "./user";

export type AppState = {
    products: Product[];
    cart: CartItem[];
    user: User | null;
    loading: boolean;
  };
  