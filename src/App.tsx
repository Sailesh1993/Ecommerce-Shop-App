import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterationPage from './pages/RegistrationPage';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <div>
      <StyledEngineProvider>
        <BrowserRouter>
      <Routes>
      <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterationPage/>} />
        <Route path="/products" element={<ProductsPage />}/>
      </Routes>
    </BrowserRouter>

      </StyledEngineProvider>
    </div>
    
  )
}
export default App 



