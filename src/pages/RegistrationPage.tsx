import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material"

import { Link } from "react-router-dom"
import { useState } from "react"
import { createUser } from "../redux/reducers/userReducer"
import useAppDispatch from "../hooks/useAppDispatch"

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                Shop Goodies
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}
const defaultTheme = createTheme()

const RegisterationPage = () => {
const dispatch = useAppDispatch()

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [avatar, setAvatar] = useState('')
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createUser({ name, email, password, avatar }))
      .then((action) => {
        const responseData = action.payload; 
        console.log("User created:", responseData);
      })
      .catch((error) => {
        console.log("Registration failed:", error);
      });
  };
  return(
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}>
          </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField
                              autoComplete="given-name"
                              name="name"
                              required
                              fullWidth
                              id="name"
                              label="Name"
                              autoFocus
                              value={name}
                             onChange={(e) => setName(e.target.value)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              required
                              fullWidth
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              id="confirm-password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                              required
                              fullWidth
                              name="avatar"
                              label="Avatar URL"
                              type="url"
                              id="avatar"
                              onChange={(e) => setAvatar(e.target.value)}
                          />
                      </Grid>
                  </Grid>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                      Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                      <Grid item>
                          <Link to="/" color="inherit">
                              Already have an account? Sign in
                          </Link>
                      </Grid>
                  </Grid>
              </Box>
      </Container>
        </ThemeProvider>
  )
}
export default RegisterationPage