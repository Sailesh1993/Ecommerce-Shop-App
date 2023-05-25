import {Link as RouterLink} from 'react-router-dom'
import { AppBar, Box, IconButton, Link, Toolbar } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const Header = ()=>{

    return(
        <AppBar sx={{height: '80px',backgroundColor: '#717171'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
            <Link variant='body2' component={RouterLink} to='/' underline="none">   </Link>
            <Box role='navigation' sx={{
                display: 'flex',
                alignItems: 'center',    
                gap: '1em'
            }}>
                <Link variant='body2' component={RouterLink} to='/' underline="none">
                    HOME
                </Link>
                <Link variant='body2' component={RouterLink} to='products'  underline="none">
                    PRODUCTS
                </Link>
                <Box sx={{position: 'relative'}}>
                    <IconButton aria-label='link to shopping cart'>
                        <ShoppingCartIcon/>
                    </IconButton>
                    <Box sx={{
                        fontSize: '0.6em',
                        fontWeight: '700',
                        backgroundColor: 'orange',
                        width: '1.6em',
                        height: '1.6em',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '10%',
                        right: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}></Box>
                </Box>
            </Box>
            </Toolbar>

        </AppBar>
    )
}
export default Header