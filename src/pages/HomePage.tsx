import React from 'react'

import Header from '../components/Header'
import ProductsPage from './ProductsPage'
import RegisterationPage from './RegistrationPage'

const HomePage = () => {
  return (
   <div>
    <Header/>
    {/* <ProductsPage/> */}
    <RegisterationPage/>
   </div>
  )
}

export default HomePage