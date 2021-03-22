import React, { useContext } from 'react'
import { Box, Button, Divider, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { SendMessageContext } from './SendMessage.context'
import FormButtons from './FormButtons'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  divider: {
    margin: theme.spacing(2, 0, 4, 0)
  },
  previewWrapper: {
    maxHeight: 400,
    overflow: 'auto',
    padding: theme.spacing(1,3,1,1),
  },
  preview: {
    padding: theme.spacing(2,4),
    '& ul, & ol': {
      margin: 'revert',
      padding: 'revert',
      listStyle: 'revert',
    },
    '& h1, & h2, & h3, & h4, & h5, & h6, & p': {
      fontFamily: 'revert',
      fontSize: 'revert',
      fontWeight: 'revert',
      margin: 'revert',
      letterSpacing: 'revert',
    },
    '& img': {
      width: 'revert',
      height: 'revert'
    }
  }
}),{name: 'PreviewMessage'})

const PreviewMessage = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage'])
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)
  const { audiences, subject, message} = sendMessageContext

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

  return (
    <Box>
      <Typography variant="h3">{t('preview.title')}</Typography>
      <Typography variant="h4">{t('preview.description')}</Typography>
      <Typography>
        {audiences.join(', ')}
      </Typography>
      <Divider className={classes.divider} />
      <Box className={classes.previewWrapper}>
        <Paper className={classes.preview} elevation={4}>
          <h3>{subject}</h3>
          <p>{moment().format('MMMM Do YYYY, h:mm a')}</p>
          <hr />
          <RenderContent source={message} />
        </Paper>
      </Box>
      <FormButtons
        leftButtons={<Button variant="text" color="primary" onClick={() => navigate('dashboard')}><ClearIcon />{t('a_common:buttons.cancel')}</Button>}
        rightButtons={
          <>
            <Button variant="outlined" color="primary" onClick={() => navigate('composeMessage')}>{t('a_common:buttons.previous')}</Button>
            <Button variant="contained" color="primary" onClick={() => navigate('submit')}>{t('preview.buttons.send')}</Button>
          </>
        }
      />
    </Box>
  )
}

export default PreviewMessage