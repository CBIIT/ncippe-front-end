import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons'

const useStyles = makeStyles( theme => ({

}))

const ExpansionPanel = withStyles(theme => ({
  root: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      boxShadow: theme.shadows[4],
    },
  },
  expanded: {},
}))(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    '&.Mui-expanded': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    }
  },
  content: {
    margin: 0,
    '&$expanded': {
      
      margin: 0,
    },
  },
  expanded: {
    minHeight: '0 !important',
  },
  expandIcon: {
    color: theme.palette.primary.main
  }
}))(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(1,2),
  },
}))(MuiExpansionPanelDetails);

const ExpansionMenu = (props) => {
  const {id = "panel1", name, children, className = ""} = props
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState({id});

  const handleChange = panel => (event, newExpanded) => {
    console.log("panel",panel)
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ExpansionPanel square expanded={expanded === id} onChange={handleChange(id)} className={className}>
      <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}d-content`}
        id={`${id}d-header`}
      >
        <Typography variant="h4">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ExpansionMenu