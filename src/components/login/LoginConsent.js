import React,{ useEffect, useRef, useState } from 'react'
import { Container, Button, Paper, Typography, Box, useMediaQuery } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useNavigate } from '@reach/router'
import { useTheme } from '@material-ui/core/styles'

const LoginConsent = () => {
  const navigate = useNavigate()
  const scrollBoxRef = useRef(null)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const el = scrollBoxRef.current
    if (el && el.scrollHeight > el.clientHeight) {
      setShowScrollHint(true)
      const handleScroll = () => {
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
          setShowScrollHint(false)
        }
      }
      el.addEventListener('scroll', handleScroll)
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [])


  const handleContinue = () => {
    // Redirect to actual login provider
    window.location.assign(`${process.env.REACT_APP_LOGIN_LINK}?date=${Date.now()}`)
  }

  const handleCancel = () => {
    navigate('/') // Or go back to previous page
  }

  return (

    <Container maxWidth={isSmallScreen ? "xs" : "md"} style={{ marginTop: '3rem' ,height: '100vh', overflow: 'auto' }}>
      <Paper elevation={2} style={{ flex:1,
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          maxHeight: 'calc(100vh - 4rem)', // space for padding
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}  >
     
        <Typography variant= "h3" gutterBottom>
          Notice & Consent
        </Typography>

          {/* Buttons at top on mobile */}
          { isSmallScreen && (
        <Box mb={2}
          borderBottom="1px solid #ddd"
          display="flex"
          justifyContent="flex-end"
          position="sticky"
          flexDirection="row"
          bgcolor="#f9f9f9"
          gap={12}>
            <Box mr={2}>
          <Button onClick={handleCancel} variant="outlined" size="small">
            Cancel
          </Button>
          </Box>
          <Button onClick={handleContinue} disabled={showScrollHint}
          variant="contained" color="primary" size="small">
              Continue to Login
          </Button>
        </Box>
         )}

        <Box style={{ flex:1 , overflowY: 'auto' ,  position: 'relative',  paddingRight: '0.5rem', }}
         ref={scrollBoxRef} >
        <div style={{ fontSize: isSmallScreen ? '0.65rem': '0.8rem', lineHeight: isSmallScreen ? '05':'0.8', marginBottom: '2rem' }}>
          <Typography variant="subtitle2" >
            This warning banner provides privacy and security notices consistent with applicable federal laws,
            directives, and other federal guidance for accessing this Government system, which includes:
          </Typography>
          <ul style={{ paddingLeft: '1.5rem', paddingBottom: '0.9rem' }}>
            <li>
              <Typography variant="subtitle2">(1) This computer network,</Typography>
            </li>
            <li>
              <Typography variant="subtitle2">(2) All computers connected to this network, and </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">(3) All devices and storage media attached to this network or to a computer on this network.</Typography>
            </li>
          </ul>

          <Typography variant="subtitle2" >
            This system is provided for Government-authorized use only.
          </Typography>
          <Typography variant="subtitle2" >
          Unauthorized or improper use of this system is prohibited and may result in disciplinary action and/or civil and criminal penalties.
          </Typography>
          <Typography variant="subtitle2" >
          Personal use of social media and networking sites on this system is limited as to not interfere with official work duties and is subject to monitoring. </Typography>
          <Typography variant="subtitle2" >
          By using this system, you understand and consent to the following:
          </Typography>
           <ul style={{ paddingLeft: '1.5rem' }}>
            <li>
              <Typography variant="subtitle2">The Government may monitor, record, and audit your system usage, including usage of personal devices and email systems for official duties or to conduct HHS business. Therefore, you have no reasonable expectation of privacy regarding any communication or data transiting or stored on this system. At any time, and for any lawful Government purpose, the government may monitor, intercept, and search and seize any communication or data transiting or stored on this system.</Typography>
            </li>
            <li>
              <Typography variant="subtitle2" style={{ paddingTop: '0.9rem' }}>Any communication or data transiting or stored on this system may be disclosed or used for any lawful Government purpose. </Typography>
            </li>
          </ul>
        </div>
        {showScrollHint && (
           <Box
           display="flex"
           justifyContent="center"
           alignItems="center"
           position="sticky"
           bottom={0}
           zIndex={1}
           height="3rem"
           style={{
             background: 'linear-gradient(to top, #f9f9f9 60%, transparent)',
           }}
         >
           <ArrowDownwardIcon style={{ fontSize: '2rem', color: '#444' }} />Scroll to read more
          </Box>
        )}    
        </Box>
         {/* Buttons at bottom for desktop */}
         { !isSmallScreen && (
        <Box mt={2}
          pt={2}
          borderTop="1px solid #ddd"
          display="flex"
          justifyContent="flex-end"
          position="sticky"
          flexDirection={isSmallScreen ? 'column' : 'row'}
          bottom={0}
          bgcolor="#f9f9f9"
          zIndex={1}>
          <Button fullWidth={isSmallScreen} onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Box ml={2}>
            <Button fullWidth={isSmallScreen} onClick={handleContinue} variant="contained" color="primary">
              Continue to Login
            </Button>
          </Box>
        </Box>
         )}
        
      </Paper>
     
    </Container>

  )
}

export default LoginConsent
