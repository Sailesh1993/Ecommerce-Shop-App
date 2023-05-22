import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <Box sx={{position: 'relative',minHeight: '100vh', backgroundColor: 'primary.main' }}>
      <Header/>

    </Box>
  )
}

export default HomePage