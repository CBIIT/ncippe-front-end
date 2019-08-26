import React, { useState } from 'react'
import { Box, Grid, TextField} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import PatientListItem from './PatientListItem'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block'
  },
  patientGrid: {
    marginBottom: theme.spacing(3)
  },
  controlsGrid: {
    marginBottom: theme.spacing(1),

  },
  textField: {
    margin: 0,
    float: 'right',
    minWidth: '250px'
  }
}))

const PatientBox = (props) => <Box>{props.children}</Box>
const PatientGrid = (props) => {
  const classes = useStyles()
  return <Grid container className={classes.patientGrid} spacing={2} justify="flex-start" alignItems="stretch">{props.children}</Grid>
}

const PatientList = ({patients}) => {
  const classes = useStyles()
  const [patientList, setPatientList] = useState(patients)
  const [view, setView] = React.useState('list')
  const allPatients = [...patients] // create new object of patients
  
  const handleChangeView = (event, view) => {
    setView(view)
  }

  const filterPatients = (event) => {
    const filteredList = allPatients.filter(item => {
      const name = `${item.firstName} ${item.lastName}`;
      return name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setPatientList(filteredList)
  }

  const ListWrapper = view === 'list' ? PatientBox : PatientGrid

  return (
    <Box className={classes.buttonGroup}>
      <Grid container className={classes.controlsGrid} spacing={3} alignItems="center">
        <Grid item xs={6}>
          <ToggleButtonGroup value={view} color="primary contained" exclusive onChange={handleChangeView}>
            <ToggleButton value="list">List View</ToggleButton>
            <ToggleButton value="tile">Tile View</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-search"
            label="Search"
            placeholder="Search by patient name"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={filterPatients}
          />
        </Grid>
      </Grid>

      <ListWrapper>
        {patientList && patientList.map((patient, i) => <PatientListItem view={view} key={i} patient={patient} />)}
      </ListWrapper>
    </Box>
  )
}

export default PatientList