import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import ProductInCart from '../types/ProductsInCart'



interface ShopCartRow{
    productInCart: ProductInCart
}
const ShopCartRow = ({productInCart}: ShopCartRow) => {
  return (
    <TableRow>
        <TableCell >{productInCart.product.id}</TableCell>
        <TableCell >{productInCart.product.title}</TableCell>
        <TableCell>
          {productInCart.product.price}
        </TableCell>
        <TableCell align="right">
          {productInCart.amount * productInCart.product.price}
        </TableCell>
    </TableRow>
  )
}

export default ShopCartRow