import React, { useContext } from 'react'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { 
  Clear as ClearIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { SendMessageContext } from './SendMessage.context'
import FormButtons from './FormButtons'
import RenderContent from '../utils/RenderContent'


const PreviewMessage = () => {
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
      <Divider sx={{ my: 4 }} />
      <Box sx={{
          maxHeight: 400,
          overflow: 'auto',
          px: 1,
          pr: 3,
          '& .preview': {
            p: 4,
          },
        }}>
        <Paper className="preview" elevation={4}>
          <h3>{subject}</h3>
          <p>{moment().format('MMMM Do YYYY, h:mm a')}</p>
          <hr />
          <RenderContent children={message} />
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