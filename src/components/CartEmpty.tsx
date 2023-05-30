import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartEmpty = () => {
    const navigate = useNavigate()  
  return (
    <Container className='pageContainer' >
        <Typography>
            Shopping cart is empty. Add something in it to make it happy!
        </Typography>
        <Button variant='outlined' color='secondary' onClick = {() => navigate('/products')}>
             Back to products
        </Button>
    </Container>    
  )
}

export default CartEmpty