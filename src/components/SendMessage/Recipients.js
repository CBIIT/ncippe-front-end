import React, { useState, useEffect } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import InputGroupError from '../inputs/InputGroupError'
import { convertToCamel } from '../../utils/utils'

const useStyles = makeStyles( theme => ({
  formControl: {
    margin: theme.spacing(2,0,1,0),
    minWidth: '200px'
  }
}),{name: 'Recipients'})

const Recipients = (props) => {
  const { error, onClick } = props
  const classes = useStyles()
  const { t } = useTranslation(['a_sendMessage'])
  const [lists, setLists] = useState({})
  const recipientList = t('recipients.list', {returnObjects: true})

  useEffect(()=>{
    const defaultValues = {}
    Object.keys(recipientList).map(key => defaultValues[convertToCamel(recipientList[key].label)] = false)
    setLists(prev => defaultValues)
  },[t])

  const handleChange = (e) => {
    // const newValue
    setLists(prev => ({
      ...prev,
      [e.target.id]: !prev[e.target.id]
    }))

    if(onClick) {
      // alert parent component to change
      onClick(!lists)
    }
  }

  return (
    <Box>
      <Typography variant="h3">{t('recipients.title')}</Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <InputGroupError variant="column" error={error} errorMessage={t('recipients.form.error')}>
          {Object.keys(lists).map((key,i) => (
            <FormControlLabel key={key}
              control={
                <Checkbox 
                  id={key}
                  color="primary" 
                  checked={lists[key]} 
                  onChange={handleChange} />
              }
              label={t(`recipients.list.${i}.label`)}
              labelPlacement="end"
            />
          ))}
        </InputGroupError>
      </FormControl>
    </Box>
  )
}

export default Recipients