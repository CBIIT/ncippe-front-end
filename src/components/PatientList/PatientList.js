import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, TextField, Typography} from '@mui/material'

import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

import PatientListItem from './PatientListItem'
// import AddParticipantInfoDialog from '../../components/Participation/AddParticipantInfoDialog'
import AddParticipantInfoDialog from '../../components/AddParticipant'

const PatientList = ({patients, patientsUpdated}) => {
  const [patientList, setPatientList] = useState(patients)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [patientToActivate, setPatientToActivate] = useState()
  const { t } = useTranslation('a_common')
  const allPatients = [...patients] // create new object of patients

  useEffect(() => {
    // use patientsUpdated flag to trigger re-renders of deep patient data
    setPatientList(patients)
  }, [patientsUpdated, patients])

  const filterPatients = (event) => {
    const filteredList = allPatients.filter(item => {
      const name = `${item.firstName} ${item.lastName}`;
      return name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setPatientList(filteredList)
    // capture analytics on first keypress and then disconnect
    // Goal is to see if search field is being used
    if(!hasSearched) {
      PubSub.publish('ANALYTICS', {
        events: 'event2',
        eventName: 'ParticipantNameSearch',
        prop11: `BioBank Account Participant Name Search`,
        eVar11: `BioBank Account Participant Name Search`,
      })
      setHasSearched(true)
    }
  }

  const activateUser = (patient) => {
    PubSub.publish('ANALYTICS', {
      events: 'event73',
      eventName: 'NewParticipantStart',
      prop42: `BioBank_NewParticipant|Start`,
      eVar42: `BioBank_NewParticipant|Start`,
    })
    setPatientToActivate(patient)
    setDialogOpen(true)
  }

  const closeUploadDialog = (success) => {
    setDialogOpen(false)
  }

  return (
    <Box sx={{ p:3 }}>
      <Grid container sx={{ mb: 5 }} spacing={3} alignItems="center">
        <Grid
          size={{
            xs: 12,
            sm: 6
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Box component='img' sx={{mr: 3, width:'49px'  }} 
            src={`${process.env.PUBLIC_URL}/assets/icons/patients.svg`} 
            alt={t('a_common:icons.user_profile')} aria-hidden="true"></Box>
            <Typography sx={{ fontWeight: 'bold' }} variant="h2" component="h2">{t('components.participantList.title')}</Typography>
          </Box>
        </Grid>
        <Grid
          sx={{ textAlign: { xs: 'center', sm: 'right' } }}
          size={{
            xs: 12,
            sm: 6
          }}>
          <TextField
            id="outlined-search"
            label={t('components.participantList.search_label')}
            type="search"
            sx={{
              width: {
                xs: '90%',
                sm: 'auto',
              },
              minWidth: {
                sm: 268,
                md: 300,
              },
              backgroundColor: 'common.white',
              m: 0,
            }}
            margin="normal"
            variant="outlined"
            onChange={filterPatients}
          />
        </Grid>
      </Grid>
      <Box>
        {patientList && patientList.map((patient, i) => <PatientListItem key={i} patient={patient} activate={activateUser} />)}
      </Box>
      <AddParticipantInfoDialog open={dialogOpen} patient={patientToActivate} setParentState={closeUploadDialog} />
    </Box>
  );
}

PatientList.displayName = "PatientList"
PatientList.propTypes = {
  /**
   * An array of patients as structured for the `PatientListItem` component
   */
  patients: PropTypes.arrayOf(PropTypes.object),
  /**
   * `timestamp` flag used to trigger a rerender of the patient list once a patient's account has been activated. This could not be done using an updated patients arrays since it is a deep comparison that will not trigger component rerenders
   */
  patientsUpdated: PropTypes.number
}

export default PatientList