import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import { SendMessageContext } from './SendMessage.context'
import FormButtons from './FormButtons'
import InputGroupError from '../inputs/InputGroupError'

const useStyles = makeStyles( theme => ({
  formControl: {
    margin: theme.spacing(2,0,1,0),
  },
}),{name: 'Recipients'})

const recipientList = [
  {
    label: 'Clinical Research Associates',
    value: 'PPE_CRC'
  },
  {
    label: 'Providers',
    value: 'PPE_PROVIDER'
  },
  {
    label: 'Participants',
    value: 'PPE_PARTICIPANT'
  }
]

const Recipients = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage'])
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)
  const [checked, setChecked] = useState(recipientList.map(() => false))
  const [error, setError] = useState(false)

  useEffect(() => {
    if(sendMessageContext.audience_state.length > 0){
      setChecked(sendMessageContext.audience_state)
    }
  },[sendMessageContext.audience_state])

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

  const handleListChange = (e) => {
    if(error) {
      setError(false)
    }
    const id = parseInt(e.target.id)
    setChecked(prev => {
      const checkedItems = [...prev]
      checkedItems[id] = e.target.checked
      return checkedItems
    })
  }

  const handleSubmit = (e) => {
    const selected = recipientList.filter((val,i) => checked[i])
    if(selected.length === 0) {
      setError(true)
    } else {
      dispatch({
        type: 'update',
        data: {
          audience_state: checked,
          audiences: selected.map(listItem => listItem.label),
          roles: selected.map(listItem => listItem.value),
          navigate: 'composeMessage'
        }
      })
    }
  }

  return (
    <Box>
      <Typography variant="h3">{t('recipients.title')}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputGroupError error={error} variant="column" errorMessage={t('recipients.form.error')}>
          {recipientList.map((recipient,i) => (
            <FormControlLabel key={i}
              control={
                <Checkbox 
                  id={i.toString()}
                  color="primary" 
                  checked={checked[i]} 
                  onChange={handleListChange}
                  name="audience"
                />
              }
              label={recipient.label}
              value={recipient.value}
              labelPlacement="end"
            />
          ))}
        </InputGroupError>
      </FormControl>
      <FormButtons
        leftButtons={<Button variant="text" color="primary" onClick={() => navigate('dashboard')}><ClearIcon />{t('a_common:buttons.cancel')}</Button>}
        rightButtons={<Button variant="contained" color="primary" onClick={handleSubmit}>{t('a_common:buttons.next')}</Button>}
      />
    </Box>
  )
}

export default Recipients