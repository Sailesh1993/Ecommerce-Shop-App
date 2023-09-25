import { useMemo } from 'react'
import { Product } from '../types/Product'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import ShoppingCart from '../types/ShoppingCart'
import ProductsInCart from '../types/ProductsInCart'
import { addProduct, removeProduct } from '../redux/reducers/shoppingCartReducer'
import { Button} from '@mui/material'
import { GridAddIcon, GridRemoveIcon } from '@mui/x-data-grid'
interface AddInCartProps{
    product: Product
}
const AddInCart = ({ product }: AddInCartProps) => {
    const dispatch = useAppDispatch()
    const shoppingCart = useAppSelector(state => state.shoppingCartReducer)
    const isProductInCart = (shoppingCart: ShoppingCart, product: Product) =>
    shoppingCart.productsInCart.some((item: ProductsInCart) => item.product.title === product.title)
    const productInCart = useMemo(()=>{
        return isProductInCart(shoppingCart, product)
    }, [product, shoppingCart])
    const handleProductAddClick = () =>{
        dispatch(addProduct(product))
    }
    const handleProductRemoveClick = () =>{
        dispatch(removeProduct(product.id))
    }
  return (
    <div>
        <Button onClick={handleProductAddClick}>
          <GridAddIcon />
        </Button>
        <Button onClick={handleProductRemoveClick}>
            <GridRemoveIcon/>
        </Button>
    </div>
    
)}
export default AddInCart

/* : <Tooltip title='Add product in cart'><GridAddIcon /></Tooltip> */