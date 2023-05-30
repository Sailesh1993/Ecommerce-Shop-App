import {Link as RouterLink} from 'react-router-dom'
import { AppBar, Box, IconButton, Link, Toolbar, colors } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Header = ()=>{

    return(
        <AppBar sx={{ height: '80px', backgroundColor: '#c5cae9' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box role='navigation' sx={{ display: 'flex', alignItems: 'center' }}>
            <Link variant='body2' component={RouterLink} to='/home' underline='none' color={'#fff'}>
              HOME
            </Link>
            <Link
              variant='body2'
              component={RouterLink}
              to='/products'
              underline='none'
              color={'#fff'}
              sx={{ marginLeft: '1em'}}
            >
              PRODUCTS
            </Link>
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
          <IconButton aria-label='link to shopping cart'>
            <ShoppingCartIcon />
          </IconButton>
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
          ></Box>
        </Box>
      </Toolbar>
    </AppBar>
    )
}
export default Header