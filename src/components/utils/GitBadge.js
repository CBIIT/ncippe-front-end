import React from 'react'
import { Badge } from '@mui/material'
import GitInfo from 'react-git-info/macro'


const GitBadge = (props) => {
  const gitInfo = GitInfo()

  return <Badge sx={{
    position: 'absolute',
    bottom: 0,
    right: theme => theme.spacing(3),
    width: 'auto',
    height: 'auto',
    transform: 'none',
    borderRadius: '6px 6px 0 0',
    px: 2,
    py: 1,
    backgroundColor: theme => theme.palette.gold.main,
    color: theme => theme.palette.common.black,
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '12px',
  }} >{gitInfo.branch}</Badge>
}

export default GitBadge