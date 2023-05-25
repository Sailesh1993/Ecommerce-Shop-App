import React, { useEffect } from 'react'
import Header from '../components/Header'

import ProductsList from '../components/ProductsList'
import ProductsPage from './ProductsPage'

const HomePage = () => {
  return (
   <div>
    <Header/>
    <ProductsPage/>
   </div>
  )
}

export default HomePage