import React from 'react'

import { Box, Input, TextField } from '@mui/material'

const RegisterationForm = () => {
  return (
    <Box component="form">
        <TextField 
        label="Email Address"
        required
        placeholder='Enter your email address'
        />
        <Input
            aria-label='Username'
            required
            placeholder='enter your username'
        />
    </Box>
  )
}

export default RegisterationForm