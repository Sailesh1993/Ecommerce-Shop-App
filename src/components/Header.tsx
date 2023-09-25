import {Link as RouterLink, useNavigate} from 'react-router-dom'
import { AppBar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Typography} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { AccountCircleRounded} from '@mui/icons-material';
import { useState } from 'react';
import { setLoginVisibility, setRegistrationVisibility } from '../redux/reducers/modalReducer';
import { logout } from '../redux/reducers/userReducer';



const Header = ()=>{
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const dispatch = useAppDispatch()
  const shoppingCart = useAppSelector(state => state.shoppingCartReducer)
  const user = useAppSelector(state => state.userReducer.currentUser)
  const userMenuItems = user ? ['Profile', 'Logout'] : ['Login','Sign up']
  if (user?.role === "admin") userMenuItems.unshift('Admin dashboard')
  const navigate = useNavigate()
  const handleMenuItemClick = (action:string) => {
    switch (action){
      case 'Logout':
        dispatch(logout())
        handleCloseUserMenu()
        navigate(`/`)
        break
      case 'Profile' :
        navigate(`/users/profile`)
        handleCloseUserMenu()
        break
      case 'Sign up':
        dispatch(setRegistrationVisibility())
        handleCloseUserMenu()
        navigate('/register')
        break
      case 'login':
        dispatch(setLoginVisibility())
        handleCloseUserMenu()
        navigate('/login')
        break
      case 'Admin dashboard':
        navigate('/admin-dashboard')
        break
    }
  }
  const handleCloseUserMenu = () => { 
    setAnchorElUser(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
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
              right: '4.2%',
            }}
          >{shoppingCart.productsInCart.length}
          </Box>
          <IconButton onClick={handleOpenUserMenu}>
            <AccountCircleRounded/>
          </IconButton>
          <Menu 
            anchorEl={anchorElUser}
            anchorOrigin= {{
            vertical:'bottom',
            horizontal:'right',
            }}
            keepMounted
            transformOrigin={{
            vertical:'bottom',
            horizontal:'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {userMenuItems.map((item)=> (
              <MenuItem key={item} onClick={()=> handleMenuItemClick(item)}>
                <Typography textAlign="center">{item}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
    )
}
export default Header