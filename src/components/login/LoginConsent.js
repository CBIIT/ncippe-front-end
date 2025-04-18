import React from 'react'
import { Container, Button, Paper, Typography, Box } from '@material-ui/core'
import { useNavigate } from '@reach/router'

const LoginConsent = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    // Redirect to actual login provider
    window.location.assign(`${process.env.REACT_APP_LOGIN_LINK}?date=${Date.now()}`)
  }

  const handleCancel = () => {
    navigate('/') // Or go back to previous page
  }

  return (

    <Container maxWidth="md" style={{ marginTop: '3rem'  }}>
      <Paper elevation={2} style={{
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}>

        <Typography variant="h3" gutterBottom>
          Notice & Consent
        </Typography>

        <div style={{ fontSize: '0.75rem', lineHeight: '1.2', marginBottom: '2rem' }}>
          <Typography variant="subtitle1" paragraph>
            This warning banner provides privacy and security notices consistent with applicable federal laws,
            directives, and other federal guidance for accessing this Government system, which includes:
          </Typography>
          <ul style={{ paddingLeft: '1.5rem', paddingBottom: '1.1rem' }}>
            <li>
              <Typography variant="subtitle1">(1) This computer network,</Typography>
            </li>
            <li>
              <Typography variant="subtitle1">(2) All computers connected to this network, and </Typography>
            </li>
            <li>
              <Typography variant="subtitle1">(3) All devices and storage media attached to this network or to a computer on this network.</Typography>
            </li>
          </ul>

          <Typography variant="subtitle1" paragraph>
            This system is provided for Government-authorized use only.
          </Typography>
          <Typography variant="subtitle1" paragraph>
          Unauthorized or improper use of this system is prohibited and may result in disciplinary action and/or civil and criminal penalties.
          </Typography>
          <Typography variant="subtitle1" paragraph>
          Unauthorized or improper use of this system is prohibited and may result in disciplinary action and/or civil and criminal penalties.
          </Typography>
          <Typography variant="subtitle1" paragraph>
          Personal use of social media and networking sites on this system is limited as to not interfere with official work duties and is subject to monitoring. </Typography>
          <Typography variant="subtitle1" paragraph>
          By using this system, you understand and consent to the following:
          </Typography>
           <ul style={{ paddingLeft: '1.5rem' }}>
            <li>
              <Typography variant="subtitle1">The Government may monitor, record, and audit your system usage, including usage of personal devices and email systems for official duties or to conduct HHS business. Therefore, you have no reasonable expectation of privacy regarding any communication or data transiting or stored on this system. At any time, and for any lawful Government purpose, the government may monitor, intercept, and search and seize any communication or data transiting or stored on this system.</Typography>
            </li>
            <li>
              <Typography variant="subtitle1" style={{ paddingTop: '1.2rem' }}>Any communication or data transiting or stored on this system may be disclosed or used for any lawful Government purpose. </Typography>
            </li>
          </ul>
        </div>
        
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Box ml={2}>
            <Button onClick={handleContinue} variant="contained" color="primary">
              Continue to Login
            </Button>
          </Box>
        </Box>
      </Paper>
     
    </Container>

  )
}

export default LoginConsent
