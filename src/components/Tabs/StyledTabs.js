import React from 'react'
import { Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  root: {
    '& .MuiTabs-scrollButtons': {
      boxShadow: 'inset 0 0 13px 0 rgba(30,111,214,0.2)',
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    },
    '& .MuiTabs-scroller': {
      overflowY: 'hidden'
    },
    '& .MuiTab-root': {
      color: '#0D1C3C',
      fontWeight: 'bold',
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
        padding: theme.spacing(0,1)
      },
      '& .MuiTab-wrapper': {
        [theme.breakpoints.up('sm')]: {
          alignItems: 'flex-start',
          marginLeft: theme.spacing(4),
        }
      },
      '&:first-of-type .MuiTab-wrapper': {
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
        }
      },
      '&:first-of-type::before': {
        display:'none'
      },
      '&:last-of-type': {
        maxWidth: 'none',
        flexGrow: 1
      }
    },
    '& .MuiTab-root::before': {
      [theme.breakpoints.up('sm')]: {
        backgroundColor: '#d2e2f7',
        content: '" "',
        display: 'block',
        position: 'absolute',
        left: -22,
        width: 40,
        height: 40,
        transform: 'rotate(-45deg)',
        boxShadow: '0 0 13px #7a98bf',
      }
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.common.white,      
      '& + a::before': {
        backgroundColor: theme.palette.common.white,
      }
    },
    '& .Mui-focusVisible': {
      backgroundColor: theme.palette.pink.light,
      '& + a::before': {
        backgroundColor: theme.palette.pink.light,
      }
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    }
  }
}))

const StyledTabs = (props) => {
  const classes = useStyles()

  return <Tabs className={classes.root} {...props} />
}

export default StyledTabs