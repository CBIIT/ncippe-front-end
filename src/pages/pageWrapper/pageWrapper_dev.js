import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button,Container,Link,} from '@mui/material'
import { styled } from '@mui/material/styles'

import Header from '../../components/region/Header/Header'
import Footer from '../../components/region/Footer/Footer'

// Replaces `mockUsers` class
export const MockUsersLink = styled(Link)(({ theme }) => ({
  position: 'absolute',
  right: 32,
  top: 16,
  opacity: 0.25,
  transition: 'opacity 300ms, box-shadow 300ms',
  '&:hover': {
    opacity: 1,
    textDecoration: 'none',
    boxShadow: theme.shadows[2],
  },
}));

const pageWrapper = (Component) => ({children, ...props}) => {

  return (
    <Box className="siteWrapper" display="flex"
     flexDirection="column" minHeight="100vh"> {/* returning a fragment here does not work in ie11 */}
      <Header />
      <Box id="main" component="main" flex="1 0 auto" sx={{ margin: '0', }}role="main">
        <Container sx={{ position: 'relative' }} >
          <MockUsersLink component={RouterLink} to='/mock-users' >
            <Button variant="outlined" color="primary">Mock User</Button>
          </MockUsersLink>
        </Container>
        <Component {...props} />
      </Box>
      <Footer />
    </Box>
  )
}

export default pageWrapper