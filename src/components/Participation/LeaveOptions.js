import React from 'react';
import { Link as RouterLink } from '@reach/router'
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Clear as ClearIcon } from '@material-ui/icons'

const useStyles = makeStyles( theme => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  gutterBottom_2: {
    marginBottom: theme.spacing(2)
  },
  formButtons: {
    marginBottom: theme.spacing(2)
  },
  btnCancel: {
    marginLeft: theme.spacing(1)
  }
}))

const LeaveOptions = (props) => {
  const classes = useStyles()

  return (
    <Box>
      <Typography className={classes.header} variant="h1" component="h1">Leave the Biobank project</Typography>
      <Typography variant="h2" className={classes.gutterBottom_2}>We're sorry to see you go.</Typography>
      <Typography className={classes.gutterBottom_2}>You have the right to stop participating and leave the Biobank program when you want to.</Typography>
      <Typography className={classes.gutterBottom_2}>You have a few choices for how we'll use samples and information we've already collected. The next section will walk you through these choices. If you have questions, please contact your research coordinator.</Typography>
      <div className={classes.formButtons}>
        <Button variant="contained" color="primary" component={RouterLink} to='../leaveQuestions'>I understand</Button>
        <Button className={classes.btnCancel} variant="text" onClick={props.cancel}><ClearIcon />Cancel</Button>
      </div>
    </Box>
  )
}

export default LeaveOptions