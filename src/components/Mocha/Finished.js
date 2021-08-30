import React, { useContext } from 'react'
import { Box, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { MochaContext } from './Mocha.context'

import Status from '../Status'
import FormButtons from '../inputs/FormButtons'

const Component = (props) => {
  const { t } = useTranslation(['a_landingMocha'])
  const [mochaContext, dispatch] = useContext(MochaContext)

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

  return (
    <Box>
      <Status state="success" title={t('upload.3.success.title')} message={t('upload.3.success.message')} />
      <FormButtons
        leftButtons={<Button variant="contained" color="primary" type="submit" onClick={() => navigate('restart')}>{t('upload.3.success.button_reset')}</Button>}
      />
    </Box>
  )
}

export default Component