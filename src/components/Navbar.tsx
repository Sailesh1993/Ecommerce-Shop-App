import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = (/* {searchText, setSearchText}:NavbarProps */) => {
  return (
        <AppBar position="static" style={{ background: '#fffff', display:'flex', justifyContent:'space-around' }}>
            <Toolbar>
                <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" >
                    Home
                </Button>
                <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" >
                    Profile
                </Button>
                <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit">
                Cart
                </Button>
                {/* <SearchBar searchText={searchText} setSearchText={setSearchText}/> */}
            </Toolbar>
            
        </AppBar>
        
  )
}

export default Navbar