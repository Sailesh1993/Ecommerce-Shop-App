import React from 'react'
import useAppSelector from '../hooks/useAppSelector'
import CartEmpty from '../components/CartEmpty'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import ShoppingCartRow from '../components/ShopCartRow'
import TableTotal from '../components/TableTotal'
import Header from '../components/Header'

const ShoppingCartPage = () => {
  const shoppingCart = useAppSelector(state => state.shoppingCartReducer)
  const productsInCart = shoppingCart.productsInCart
  if(productsInCart.length === 0) return <CartEmpty />
  return (
   
    <TableContainer component={Paper} sx={{
      padding: '6em 0',
      minHeight: '90vh'
    }}>
      <Header/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell >Title</TableCell>
            <TableCell >Price</TableCell>
            {/* <TableCell>Unit Price</TableCell> */}
            <TableCell  align="right">Quantity</TableCell>
          </TableRow>          
        </TableHead>
        <TableBody>
          {productsInCart.map(product => <ShoppingCartRow key={product.product.id} productInCart={product}/>)}
          <TableTotal shoppingCart={shoppingCart}/>
        </TableBody>
      </Table>
  </TableContainer>
  )
}

export default ShoppingCartPage