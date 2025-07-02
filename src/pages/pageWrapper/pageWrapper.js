import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/region/Header/Header'
import Footer from '../../components/region/Footer/Footer'

const pageWrapper = (Component) => ({children, ...props}) => {
  return (
    <Box className="siteWrapper" sx={{ display: "flex",
     flexDirection:"column", minHeight:"100vh" }}>
      <Header />
      <Box id="main" component="main"  sx={{ flex: "1 0 auto",
         margin: '0', }} role="main">
        <Component {...props} />
      </Box>
      <Footer />
    </Box>
  )
}

export default pageWrapper
