
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/HomePage"
import ProductsPage from './pages/ProductsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import { StyledEngineProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
    children:[
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'shopping-cart',
        element: <ShoppingCartPage />
      }
    ]
  }
])
const App = () => {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router}/>
      </StyledEngineProvider>
    </div>
    
  )
}
export default App
