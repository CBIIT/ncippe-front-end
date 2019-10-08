import React, { useState, useEffect } from 'react'
import { Typography, MenuList } from '@material-ui/core'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon} from '@material-ui/icons'

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
    padding: 0,
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  menuList: {
    padding: 0,
    width: '100%'
  },
}))

const ExpansionMenu = (props) => {
  const classes = useStyles()
  const {id = "panel1", name, children, className = ""} = props
  const [expanded, setExpanded] = useState(props.expanded);

  useEffect(() => {
    setExpanded(props.expanded)
    //clean up
    return () => {}
  },[props.expanded])

  const handleChange = panel => (event, newExpanded) => {
    if(props.handleClick) {
      props.handleClick(newExpanded ? true : false)
    } else {
      setExpanded(newExpanded ? true : false);
    }
  };

  return (
    <ExpansionPanel square expanded={expanded} onChange={handleChange(id)} className={className}>
      <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}d-content`}
        id={`${id}d-header`}
      >
        <Typography variant="h4">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <MenuList className={classes.menuList} autoFocusItem={true}>
          {children}
        </MenuList>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ExpansionMenu