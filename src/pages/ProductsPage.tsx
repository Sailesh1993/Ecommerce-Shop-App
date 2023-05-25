import React, { useEffect, useState } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import { Container, Grid, Input, Pagination } from "@mui/material"
import useDebounce from '../hooks/useDebounce'
import { Product } from '../types/Product'
import useAppSelector from '../hooks/useAppSelector'
import GridProducts from '../components/GridProducts'
import { fetchAllProducts } from '../redux/reducers/productsReducer'

const ProductsPage = () => {
    const dispatch = useAppDispatch()
    useEffect(()=>{
      /* console.log("Dispatching fetchAllProducts") */
      dispatch(fetchAllProducts())
  },[dispatch])
    const [itemOffset, setItemOffset] = useState(0)
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const productsReducer = useAppSelector(state => state.productsReducer)
    useEffect(() => {
        if(productsReducer.products.length > 0) {
          setItemOffset((page - 1) * itemsPerPage % productsReducer.products.length)
        }
      }, [page])
    const filterFunc = (filter: string, products: Product[]): Product[] => {
        return products.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
    }
    const searchDebounce = useDebounce<Product>(filterFunc, productsReducer.products)
    /* console.log(searchDebounce) */
    const pageCount = Math.ceil(searchDebounce.filteredItems.length / itemsPerPage)
    const endOffset = itemOffset+itemsPerPage
    const displayItem = searchDebounce.filteredItems.slice(itemOffset,endOffset)
    /* console.log(displayItem) */
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