import React from 'react'

import Header from '../components/Header'
import ProductsPage from './ProductsPage'
import RegisterationPage from './RegistrationPage'
import LoginPage from './LoginPage'

const HomePage = () => {
  return (
   <div>
    <Header/>
    <LoginPage/>
   </div>
  )
}

export default HomePage