import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { useState } from "react";
import { logout } from "../redux/reducers/userReducer";
import { setLoginVisibility, setRegistrationVisibility } from "../redux/reducers/modalReducer";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { currentUser, isLoggedIn } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
  const shoppingCart = useAppSelector((state) => state.shoppingCartReducer);
  const userMenuItems = currentUser
    ? ["Profile", "Logout"]
    : ["Login", "Sign up"];
  const navigate = useNavigate();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case "Logout":
        dispatch(logout());
        handleCloseUserMenu();
        navigate("/");
        break;
      case "Profile":
        navigate(`/users/profile`);
        handleCloseUserMenu();
        break;
      case "Sign up":
        dispatch(setRegistrationVisibility());
        handleCloseUserMenu();
        break;
      case "Login":
        dispatch(setLoginVisibility());
        handleCloseUserMenu();
        break;
    }
  };
  return (
    <AppBar sx={{ height: "80px", backgroundColor: "#c5cae9" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link variant="body2" component={RouterLink} to="/" underline="none">
          <Typography variant="h4" color={"#303030"}>
            E-SHOPIFY
          </Typography>
        </Link>
        <Box
          role="navigation"
          sx={{ display: "flex", alignItems: "center", gap: "1em" }}
        >
          <Link
            variant="body2"
            component={RouterLink}
            to="/"
            underline="none"
            color={"#030303"}
          >
            HOME
          </Link>
          <Link
            variant="body2"
            component={RouterLink}
            to="/products"
            underline="none"
            color={"#030303"}
          >
            PRODUCTS
          </Link>
          <Box
            role="navigation"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
              marginLeft: "auto",
            }}
          >
            <Link
              variant="body2"
              component={RouterLink}
              to="/cart"
              underline="none"
              color={"#fff"}
            >
              <IconButton aria-label="link to shopping cart">
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <Box
              sx={{
                fontSize: "0.7em",
                fontWeight: "760",
                backgroundColor: "#030303",
                width: "1.6em",
                height: "1.6em",
                borderRadius: "50%",
                position: "absolute",
                top: "8%",
                right: "4.1%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {shoppingCart.productsInCart.length}
            </Box>
          </Box>
          <IconButton onClick={handleOpenUserMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {userMenuItems.map((item) => (
              <MenuItem key={item} onClick={() => handleMenuItemClick(item)}>
                <Typography textAlign={"center"}>{item}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
