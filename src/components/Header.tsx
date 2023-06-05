import {Link as RouterLink} from 'react-router-dom'
import { AppBar, Box, IconButton, Link, Toolbar} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';



const Header = ()=>{
  const dispatch = useAppDispatch()
  const shoppingCart = useAppSelector(state => state.shoppingCartReducer)
    return(
        <AppBar sx={{ height: '80px', backgroundColor: '#c5cae9' }}>
          <Toolbar sx={{ justifyContent: 'space-between'}}>
            <Box role='navigation' sx={{ display: 'flex', alignItems: 'center'}}>
            <Link variant='body2' component={RouterLink} to='/home' underline='none' color={'#030303'}>
              HOME
            </Link>
            <Link
              variant='body2'
              component={RouterLink}
              to='/products'
              underline='none'
              color={'#030303'}
              sx={{ marginLeft: '1em'}}
            >
              PRODUCTS
            </Link >
          </Box>
          <Box
            role='navigation'
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            marginLeft: 'auto',
            }}
          >
            <Link 
            variant='body2'
            component={RouterLink}
            to='/cart'
            underline='none'
            color={'#fff'}
            sx={{ marginLeft: '1em'}}>
          <IconButton aria-label='link to shopping cart'>
            <ShoppingCartIcon />
          </IconButton>
          </Link>
          <Box
            sx={{
              fontSize: '0.6em',
              fontWeight: '700',
              backgroundColor: '#212121',
              width: '1.6em',
              height: '1.6em',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '17%',
              right: '1.2%',
            }}
          >{shoppingCart.productsInCart.length}</Box>
        </Box>
      </Toolbar>
    </AppBar>
    )
}
export default Header