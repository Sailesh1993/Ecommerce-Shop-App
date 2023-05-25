import React, { useEffect } from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import { fetchAllProducts } from '../redux/reducers/productsReducer'
import useAppSelector from '../hooks/useAppSelector'

const ProductsList = () => {
    const dispatch = useAppDispatch()
    const { products, loading, error } = useAppSelector(state => state.productsReducer)
    console.log(products)
    const data = useEffect(()=>{
        dispatch(fetchAllProducts)
    },[])
    /* console.log(data) */
  return (
    <div>
    </div>
  )
}

export default ProductsList