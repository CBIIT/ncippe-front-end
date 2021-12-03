import React, { useContext } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { 
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import getAPI from '../../data'

import { MochaContext } from './Mocha.context'
import Status from '../Status'
import FormButtons from '../inputs/FormButtons'
import { isValidUserId } from '../../utils/utils'


const ParticipantId = (props) => {
  const { t } = useTranslation(['a_landingMocha','a_common'])
  const [mochaContext, dispatch] = useContext(MochaContext)

  const navigate = (to) => {
    dispatch({
      type: 'navigate',
      data: to
    })
  }

    // controlled text input
    const handlePatientId = (event) => {
      dispatch({
        type: 'update',
        data: {
          patientId: event.target.value
        }
      })
    }
  
  const validatePatientId = (event) => {
    // console.log("validate patient id")
    // validate GUID length before next/api call
    // example GUID: b36284a2-cecf-4756-996c-abb0d8ba652c
    if(isValidUserId(mochaContext.patientId)) {
  
      // api[env].fetchUser({patientId: mochaContext.patientId, token})
      getAPI.then(api => {
        api.fetchUser({patientId: mochaContext.patientId})
          .then(resp => {
            // if (resp instanceof Error)
            if(resp.hasOwnProperty('message') || !resp.patientId) {
              // patient data not found on the system
              dispatch({
                type: 'update',
                data: {
                  notFound: true
                }
              })
              PubSub.publish('ANALYTICS', {
                events: 'event81',
                eventName: 'PatientIDError',
                prop42: `BioBank_AdminUpload|Error: User not found in the system`,
                eVar42: `BioBank_AdminUpload|Error: User not found in the system`,
              })
            } else {
              // user found - progress
              const {firstName, lastName, reports} = resp
              dispatch({
                type: 'update',
                data: {
                  firstName,
                  lastName,
                  notFound: false,
                  reports,
                  navigate: 'addReport'
                }
              })
              PubSub.publish('ANALYTICS', {
                events: 'event73',
                eventName: 'PatientIDEntered',
                prop42: `BioBank_AdminUpload|PatientIDEntered`,
                eVar42: `BioBank_AdminUpload|PatientIDEntered`,
              })
            }
          })
      })
    } else {
      // validation error
      dispatch({
        type: 'update',
        data: {
          error: true,
          notFound: false
        }
      })
    }
  }

  return (
    <div>
      <Typography variant="h6">{t('upload.0.form_title')}</Typography>
      <TextField
        error={mochaContext.error}
        required
        id="patientId-required"
        label={t('upload.0.input_label')}
        margin="normal"
        variant="outlined"
        helperText={mochaContext.error ? t('upload.0.input_error') : t('upload.0.input_helper_text')}
        onChange={handlePatientId}
        value={mochaContext.patientId}
        inputProps={{
          maxLength: 20,
        }}
      />
      {mochaContext.notFound && <Status state="error" title={t('upload.0.error.title')} message={t('upload.0.error.message')} />}

      <FormButtons
        leftButtons={
          <>
          <Button variant="contained" color="primary" type="submit" onClick={validatePatientId}>{t('a_common:buttons.next')}</Button>
          <Button variant="text" color="primary" onClick={() => navigate('dashboard')}><ClearIcon />{t('a_common:buttons.cancel')}</Button>
          </>
        }
      />
    </div>
  )
}

export default ParticipantId