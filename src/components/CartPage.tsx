import { FC} from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types/appState';
import { CartItem } from '../types/cart';


const CartPage: FC = () => {
    const cart = useSelector<AppState, CartItem[]>(state => state.cart);
  
    return (
      <div>
        <h1>Cart Page</h1>
        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.product.id}>
                <h2>{item.product.title}</h2>
                <p>Price: {item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  export default CartPage