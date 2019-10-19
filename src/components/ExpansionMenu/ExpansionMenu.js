import React, { useState, useEffect } from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, MenuList, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  ExpandMore,
  AddRounded,
  RemoveRounded
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    '&.Mui-expanded': {
      margin: 'auto',
    }
  },
  expansionPanelSummary: {
    '& .MuiExpansionPanelSummary-content': {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  expansionPanelDetails: {
    padding: 0,
  },
  menuList: {
    padding: 0,
    width: '100%'
  },

  floating: {
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
    '&.Mui-expanded': {
      boxShadow: theme.shadows[4],
    },
    '& .MuiExpansionPanelSummary-root': {
      '&.Mui-expanded': {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        minHeight: '0 !important',
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        color: theme.palette.primary.main
      }
    }
  },

  stacked: {
    '& .MuiExpansionPanelSummary-root': {
      padding: '0 12px',

      '&.Mui-expanded': {
        minHeight: '48px',
        backgroundColor: theme.palette.primary.light
      },
      '& .MuiExpansionPanelSummary-content': {
        order: 1
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        margin: 0,
        padding: '0 6px 0 0',
        '&.Mui-expanded': {
          transform: 'none'
        }
      },
    },
    '& .MuiList-root': {
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
      }
    }
  }
}))

const ExpansionMenu = (props) => {
  const classes = useStyles()
  const {
    id = "panel1", 
    name, children, 
    className = "", 
    expanded = false, 
    handleClick,
    style = 'stacked'
  } = props
  
  const [isExpanded, setIsExpanded] = useState(expanded)
  const ExpandIcon = style !== 'stacked' ? ExpandMore : AddRounded
  const CollapseIcon = style !== 'stacked' ? ExpandMore : RemoveRounded

  useEffect(() => {
    setIsExpanded(expanded)
    //clean up
    return () => {}
  },[expanded])

  const handleChange = (event, newExpanded) => {
    if(handleClick) {
      handleClick(newExpanded ? true : false)
    } else {
      setIsExpanded(newExpanded ? true : false);
    }
  };

  return (
    <ExpansionPanel 
      square 
      expanded={isExpanded} 
      onChange={handleChange} 
      className={`${classes.root} ${style !== 'stacked' ? classes.floating : classes.stacked} ${className}`}
    >
      <ExpansionPanelSummary 
        className={classes.expansionPanelSummary}
        expandIcon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        aria-controls={`${id}Menu--content`}
        id={`${id}Menu--header`}
      >
        <Typography variant="h4">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <MenuList className={classes.menuList} autoFocusItem={true}>
          {children}
        </MenuList>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ExpansionMenu