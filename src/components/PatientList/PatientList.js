import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

import PatientListItem from './PatientListItem'
import AddParticipantInfoDialog from '../../components/Participation/AddParticipantInfoDialog'

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: theme.spacing(3),
    width: '49px',
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  grid_textField: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    }
  },
  textField: {
    margin: 0,
    width: '90%',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      minWidth: 268
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 300
    }
  },

}),{name: 'PatientList'})

const PatientList = (props) => {
  const {patients, patientsUpdated} = props
  const classes = useStyles()
  const [patientList, setPatientList] = useState(patients)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [patientToActivate, setPatientToActivate] = useState()
  const { t } = useTranslation('a_common')
  const { trackEvent } = useTracking()
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
    if(hasSearched === false) {
      trackEvent({
        prop11: `BioBank Account Participant Name Search`,
        eVar11: `BioBank Account Participant Name Search`,
        events: 'event2',
        eventName: 'ParticipantNameSearch'
      })
      setHasSearched(true)
    }
  }

  const activateUser = (patient) => {
    trackEvent({
      prop42: `BioBank_NewParticipant|Start`,
      eVar42: `BioBank_NewParticipant|Start`,
      events: 'event73',
      eventName: 'NewParticipantStart'
    })
    setDialogOpen(true)
    setPatientToActivate(patient)
  }

  const closeUploadDialog = (success) => {
    setDialogOpen(false)
  }

  return (
    <Box className={classes.root}>
      <Grid container className={classes.title} spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <div className={classes.titleWithIcon}>
            <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} alt={t('a_common:icons.user_profile')} aria-hidden="true"></img>
            <Typography className={classes.cardTitle} variant="h2" component="h2">{t('components.participantList.title')}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.grid_textField}>
          <TextField
            id="outlined-search"
            label={t('components.participantList.search_label')}
            type="search"
            className={classes.textField}
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
  )
}

export default PatientList