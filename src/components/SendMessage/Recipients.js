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

const Recipients = () => {
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage'])
  const [sendMessageContext, dispatch] = useContext(SendMessageContext)
  const recipientList = t('recipients.list', {returnObjects: true})
  const [checked, setChecked] = useState(Object.values(recipientList).map(() => false))
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
    const selected = Object.values(recipientList).filter((val,i) => checked[i]).map(listItem => listItem.label)
    if(selected.length === 0) {
      setError(true)
    } else {
      dispatch({
        type: 'update',
        data: {
          audience_state: checked,
          audiences: selected,
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
          {checked.map((isChecked,i) => (
            <FormControlLabel key={i}
              control={
                <Checkbox 
                  id={i.toString()}
                  color="primary" 
                  checked={isChecked} 
                  onChange={handleListChange}
                  name="audience"
                />
              }
              label={t(`recipients.list.${i}.label`)}
              value={t(`recipients.list.${i}.label`)}
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