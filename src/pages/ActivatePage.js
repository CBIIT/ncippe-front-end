import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { redirectTo } from "@reach/router"
import queryString from 'query-string'

import key from '../data/sandbox-cert'

const useStyles = makeStyles(theme => ({
}))

const randomString = (length) => [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('')

const clientOptions = {
  client_id: 'urn:gov:gsa:openidconnect:sp:expressjs',
  token_endpoint_auth_method: 'private_key_jwt',
  id_token_signed_response_alg: 'RS256'
}

const strategyParams = {
  acr_values: `http://idmanagement.gov/ns/assurance/loa/1`,
  client_id: 'urn:gov:gsa:openidconnect.profiles:sp:sso:nci:ppeportal',
  prompt: 'login',
  redirect_uri: `https://devintg.ppe.publicissapient.tech`,
  response_type: 'code',
  scope: 'openid email',
  nonce: randomString(32),
  state: randomString(32),
}

const discoveryUrl = 'https://dashboard.int.identitysandbox.gov'

const CreateAccount = (event) => {

  console.log('trigger login.gov')
  console.log(queryString.stringify(strategyParams))
  window.location = `https://idp.int.identitysandbox.gov/openid_connect/authorize?acr_values=http%3A%2F%2Fidmanagement.gov%2Fns%2Fassurance%2Floa%2F1&client_id=urn%3Agov%3Agsa%3Aopenidconnect.profiles%3Asp%3Asso%3Anci%3Appeportal&prompt=login&redirect_uri=https%3A%2F%2Fdevintg.ppe.publicissapient.tech&response_type=code&scope=openid+email&nonce=${randomString(32)}&state=${randomString(32)}`

}
export default () => {
  const classes = useStyles()
  return (
    <Box my={6} className={classes.root}>
      <Container className={classes.mainContainer}>
        <Button variant="contained" color="primary"onClick={CreateAccount}>Login Now</Button>
      </Container>
    </Box>
  )
}