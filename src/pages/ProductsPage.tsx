import React, { useEffect, useState } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import { fetchAllProducts } from '../redux/reducers/productsReducer'
import { Container, Grid, Input, Pagination } from "@mui/material"
import useDebounce from '../hooks/useDebounce'
import { Product } from '../types/Product'
import useAppSelector from '../hooks/useAppSelector'
import GridProducts from '../components/GridProducts'
const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const [itemOffset, setItemOffset] = useState(0)
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    useEffect(()=>{
        dispatch(fetchAllProducts)
    },[])
    useEffect(() => {
        if(productsReducer.products.length > 0) {
          setItemOffset((page - 1) * itemsPerPage % productsReducer.products.length)
        }
      }, [page])
    const filterFunc = (filter: string, products: Product[]): Product[] => {
        return products.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    }
      
    const productsReducer = useAppSelector(state => state.productsReducer)
    const searchDebounce = useDebounce<Product>(filterFunc, productsReducer.products)
    const displayItem = searchDebounce.filteredItems.slice(itemOffset)
    const pageCount = Math.ceil(searchDebounce.filteredItems.length / itemsPerPage)
    const endOffset = itemOffset+itemsPerPage
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      }
  return (
    <Container maxWidth='lg' sx={{
        padding: '6em 0',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Input 
            onChange={searchDebounce.handleChange} 
            value={searchDebounce.search} 
            placeholder='Find Your Choice' 
            sx={{maxWidth: 400}} 
        />
        <Grid container spacing={2} sx={{
                marginTop: 8,
            marginBottom: 4
        }}>
        {displayItem.map(item => 
          <GridProducts key={item.id} product={item} />)
        }

        </Grid>
        <Pagination page={page} count={pageCount} onChange={(e, value) => handleChange(e, value)} sx={{
        alignSelf: 'center'
      }} />

    </Container>
  )
}

export default ProductsPage