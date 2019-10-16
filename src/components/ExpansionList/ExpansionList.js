import React, { useState, useEffect } from 'react'
import { Typography, MenuList } from '@material-ui/core'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { 
  AddRounded as ExpandIcon,
  RemoveRounded as CollapseIcon
} from '@material-ui/icons'

const ExpansionPanel = withStyles(theme => ({
  root: {
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    padding: '0 12px',
    '&$expanded': {
      minHeight: '48px',
      backgroundColor: theme.palette.primary.light
    }
  },
  content: {
    margin: 0,
    order: 1,
    '&$expanded': {
      margin: 0,
    }
  },
  expanded: {
    // required for '&$expanded' references
  },
  expandIcon: {
    margin: 0,
    padding: '0 6px 0 0',
    '&$expanded': {
      transform: 'none'
    }
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
    width: '100%',
    '& a': {
      color: theme.palette.common.black,
      textDecoration: 'none',
    },
    '& li:hover': {
      backgroundColor: theme.palette.navy.dark,
      color: theme.palette.common.white,
      fontWeight: 600,
      '& a': {
        color: theme.palette.common.white,
      }
    },
  },
}))

const ExpansionList = (props) => {
  const {expanded = false, handleClick} = props
  const classes = useStyles()
  const {id = "panel1", name, children, className = ""} = props
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded)
    //clean up
    return () => {}
  },[expanded])

  const handleChange = panel => (event, newExpanded) => {
    if(handleClick) {
      handleClick(newExpanded ? true : false)
    } else {
      setIsExpanded(newExpanded ? true : false);
    }
  };

  return (
    <ExpansionPanel square expanded={isExpanded} onChange={handleChange(id)} className={className}>
      <ExpansionPanelSummary 
        expandIcon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
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

export default ExpansionList