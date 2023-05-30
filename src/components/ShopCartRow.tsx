import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import ProductsInCart from '../types/ProductsInCart'


interface ShoppingCartRow{
    productInCart: ProductsInCart
}
const ShoppingCartRow = ({productInCart}: ShoppingCartRow) => {
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

export default ShoppingCartRow