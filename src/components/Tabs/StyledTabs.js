import React from 'react'
import { Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  poot: {
    '& .MuiTabs-scrollButtons': {
      backgroundColor: '#d2e2f7',
      // border: `1px solid #7a98bf`,
      boxShadow: 'inset 0 0 13px 0 rgba(30,111,214,0.2)',
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    },

    '& .MuiTabs-scroller': {
      overflowY: 'hidden'
    },
    '& .MuiTabs-flexContainer': {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },
    '& .MuiTab-root': {
      overflow: 'visible',
      borderRight: '1px solid #fafafa',
      borderLeft: '1px solid transparent',
      color: '#0D1C3C',
      fontWeight: 'bold',
      fontSize: 16,
      // backgroundColor: '#d2e2f7',
      zIndex: 0,
      [theme.breakpoints.up('sm')]: {
        border: 'none',
        paddingRight: 32,
        marginLeft: 0,
        paddingLeft: 0,
      },

      '&:first-of-type': {
        borderRight: 'none'
      },
      '&:last-of-type': {
        borderLeft: 'none',
        paddingLeft: 16,

        '&::before': {
          left: 0
        },
      },

      '& .MuiTab-wrapper': {
        zIndex: 3
      },
    },
    '& .MuiTab-root::before': {
      backgroundColor: theme.palette.primary.medium,
      [theme.breakpoints.up('sm')]: {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 32,
        bottom: 0,
        left: -32,
        zIndex: 2
      }
    },
    '& .MuiTab-root::after': {
      color: '#d2e2f7',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        content: '"◢"',
        position: 'absolute',
        right: 14,
        zIndex: 1,
        transform: 'rotate(-45deg)',
        fontSize: 36,
        
        textShadow: '0 0 13px #7a98bf',
        // borderLeft: '24px solid #fff',
        // borderTop: '24px solid transparent',
        // borderBottom: '24px solid transparent',
      },
    },
    '& .Mui-selected': {
      borderLeft: '1px solid transparent',
      borderRight: '1px solid transparent',
      backgroundColor: '#fff',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'transparent',
      },
      '& ~ a': {
        borderLeft: '1px solid #fafafa',
        borderRight: '1px solid transparent',
      }
    },
    '& .Mui-selected::before': {
      backgroundColor: '#fff',
    },

    '& .Mui-selected::after': {
      color: '#fff',
      // textShadow: '0 0 13px #7a98bf',
      // borderLeft: '24px solid #fff',
      // borderTop: '24px solid transparent',
      // borderBottom: '24px solid transparent',
    },
    '& .MuiTabs-indicator': {
      display: 'none'
    }
  }
}))

const StyledTabs = (props) => {
  const classes = useStyles()

  return <Tabs className={classes.poot} {...props} />
}

export default StyledTabs