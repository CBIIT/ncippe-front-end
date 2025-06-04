import React from 'react'
import {  styled, Tabs,  } from '@mui/material'
import { t } from 'i18next'


const StyledTabsSx = styled(Tabs)(({ theme }) => ({
  position: 'relative',
  '& .MuiTabs-flexContainer': {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  '& .MuiTabs-scrollButtons': {
    boxShadow: 'inset 0 0 13px 0 rgba(30,111,214,0.2)',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  '& .MuiTabs-scroller': {
    overflowY: 'hidden',
  },
  '& .MuiTab-root': {
    position: 'relative',
    overflow: 'hidden',
    color: '#0D1C3C',
    fontWeight: 'bold',
    textAlign: 'left',
    whiteSpace: 'normal',
    minHeight: 52,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
      padding: theme.spacing(0, 6),
    },

    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      textAlign: 'left',
      width: '100%',
      [theme.breakpoints.up('sm')]: { 
        marginLeft: theme.spacing(0), 
      } 
    },
    '&:first-of-type .MuiTab-wrapper': {
      [theme.breakpoints.up('sm')]: { 
        marginLeft: theme.spacing(0),   
      } 
    },
    '&:first-of-type::before': {
      display: 'none',
    },
    // '&:last-of-type': {
    //   maxWidth: 'none',
    //   flexGrow: 1,
    // },
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
      zIndex: 0,
      transform: 'rotate(-45deg)',
      boxShadow: '0 0 13px #7a98bf',
    },
  },
  
  '& .Mui-selected': {
    backgroundColor: theme.palette.common.white,
    zIndex: 2,
    '& + .MuiTab-root::before': {
      backgroundColor: theme.palette.common.white,
    },
  },
  '& .Mui-focusVisible': {
    backgroundColor: theme.palette.pink.light,
    '& + .MuiTab-root::before': {
      backgroundColor: theme.palette.pink.light,
    },
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}))
const StyledTabs = (props) => {
  
  return <StyledTabsSx  {...props} />
}

export default StyledTabs