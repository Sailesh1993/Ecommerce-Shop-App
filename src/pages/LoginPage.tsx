import { useState } from "react"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { useNavigate } from "react-router"
import { login } from "../redux/reducers/userReducer"
import { Box, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import CustomButton from "../components/CustomButton"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { Padding } from "@mui/icons-material"

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading} = useAppSelector((state) => state.userReducer);
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // State to store the login error message

  const handleLogin = (data: { email: string; password: string }) => {
    const { email, password } = data
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home")
      })
      .catch((error) => {
        if (error.message === "Invalid email or password") {
          setLoginError("Invalid email or password")
        } else {
          console.log(error)
        }
      })
  }
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(handleLogin)} style={{marginTop:'10%', marginLeft:'40%',}} >
        <Box className="form">
          <Typography component="h4" variant="h4">
            Login
          </Typography>
          <TextField
            {...register("email", { required: true })}
            label="E-mail"
            id="emailField"
            margin="normal"
          /> <br />
          <TextField
            {...register("password", { required: true })}
            label="Password"
            type="password"
            id="passwordField"
            margin="normal"
          /> <br />
          <CustomButton type="submit" disabled={loading}>
             Login
          </CustomButton>
          <Typography variant="body1" component="body" sx={{padding: '10px'}}>
            Register to login
            <Link to="/register">Register</Link>
          </Typography>
          <Box>
          {loading ? (
            "Please wait..."
          ) : isLoggedIn ? (
            `Logged in as ${currentUser?.email}`
          ) : (
            <span className="error">{loginError || "You are not logged in."}</span>
          )}
          </Box>
        </Box>
      </form>
    </div>
  )
}

export default LoginPage



