import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { LoginConsumer } from '../../components/login/Login.context'
import UploadReport from '../../components/Mocha/UploadReport'

export default () => {
  const { t } = useTranslation('a_common')
  return (
    <Box>
      <Container className="mainContainer--dashboard">
          <LoginConsumer>
          {([{firstName, lastName}]) => <Box my={6} mx={0}><Typography variant='h1' component='h1' gutterBottom>{t('welcome')}, {firstName} {lastName}</Typography></Box>}
          </LoginConsumer>
          <UploadReport />
      </Container>
    </Box>
  )
}