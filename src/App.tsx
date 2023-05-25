import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element:<HomePage/>,
    children:[
      {
        path: 'products',
        element: <ProductsPage />
      }
    ]
  }
])
const App = () => {
  return (
    <div>
      <StyledEngineProvider>
        <RouterProvider router={router}/>
      </StyledEngineProvider>
    </div>
    
  )
}
export default App
