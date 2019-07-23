import React, { useContext, useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { Container, Typography } from '@material-ui/core'

import LoginContext from '../context/login'

export default () => {
  const login = useContext(LoginContext)
  const [data, setData] = useState({
    featuredArticle: [],
    featureLists: [],
  })

  console.log(login)

  useEffect(() => {
    fetch(`/api/users?id=1`)
      .then(resp => resp.json())
      .then(data => {
        // console.log("Dashboard fetch:", data)
        setData(data[0])
      })
  }, [])

  return (
    <Box my={6} mx={0}>
      <Container>
        <Typography variant='h3' component='h1' gutterBottom>
          Dashboard
        </Typography>
      </Container>
    </Box>
  )
}
