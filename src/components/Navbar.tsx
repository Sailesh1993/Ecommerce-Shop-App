import React from 'react'
import logo from "../assets/walmart-logo.jpeg"
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
const Navbar = () => {
  return (
   <AppBar position='static' sx={{height: 64}} >
    <Toolbar >
        <Typography variant='h6' component="div" sx={{flexGrow:1}} style={{ background: '#fffff', display:'flex', justifyContent:'space-around' }}>
            <Link to="/" style={{textDecoration:"none"}}>
                <img src={logo} alt="Logo" height="36"/>
            </Link>
            <IconButton color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <ShoppingCart />
        </IconButton>
        </Typography>
    </Toolbar>

   </AppBar>
  )
}

export default Navbar