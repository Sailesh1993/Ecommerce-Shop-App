import { useMemo } from 'react'
import { Product } from '../types/Product'
import { Link as RouterLink } from 'react-router-dom'
import { Paper, Link, Grid, Box, Typography } from '@mui/material'
import AddInCart from './AddInCart'

interface GridProductsProps {
    product: Product
}
const GridProducts = ({product}: GridProductsProps) => {
    const child = useMemo(()=>{
        return(
            <Paper sx={{
                padding: '0.7em',
                backgroundColor: '#c5cae9'
                }}>
                <Link aria-label={`Link to product page: ${product.title}`} color={'secondary.light'} sx={{
                textDecoration: 'none'}} component={RouterLink} to={`/products/${product.id}`}>
                    <Box sx={{
                    background: `url(${product.images[0]}) center `,
                    height: '15em'
                }}></Box>
                <Typography variant='h6'color={'#212121'}>
                    {product.title}
                </Typography>
                </Link>
                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h6'color={'#212121'}>{product.price} €</Typography>
                    {/* <Box>
                        <GridAddIcon />
                        <GridRemoveIcon />
                    </Box> */}
                    <AddInCart product = {product}/>
                </Box>
            </Paper>
        )
    },[product])
  return (
    <Grid item xs={12} md={4} lg={3}>
        {child}
    </Grid>
  )
}

export default GridProducts