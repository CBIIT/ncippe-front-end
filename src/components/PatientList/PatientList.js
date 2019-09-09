import React, { useState } from 'react'
import { Box, Grid, TextField, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PatientListItem from './PatientListItem'

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
  textField: {
    margin: 0,
    float: 'right',
    minWidth: '300px',
  },

}))

const PatientList = ({patients}) => {
  const classes = useStyles()
  const [patientList, setPatientList] = useState(patients)
  const allPatients = [...patients] // create new object of patients

  const filterPatients = (event) => {
    const filteredList = allPatients.filter(item => {
      const name = `${item.firstName} ${item.lastName}`;
      return name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setPatientList(filteredList)
  }

  return (
    <Box className={classes.root}>
      <Grid container className={classes.title} spacing={3} alignItems="center">
        <Grid item xs={6}>
          <div className={classes.titleWithIcon}>
            <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/patients.svg`} alt='patient icon' aria-hidden="true"></img>
            <Typography className={classes.cardTitle} variant="h2" component="h2">Your Patients</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-search"
            label="Search by patient name"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={filterPatients}
          />
        </Grid>
      </Grid>

      <Box>
        {patientList && patientList.map((patient, i) => <PatientListItem key={i} patient={patient} />)}
      </Box>
    </Box>
  )
}

export default PatientList