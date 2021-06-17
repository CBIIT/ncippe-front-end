import React from 'react'
import { Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GitInfo from 'react-git-info/macro'

const useStyles = makeStyles( theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    right: theme.spacing(3),
    width: 'auto',
    height: 'auto',
    transform: 'none',
    borderRadius: '6px 6px 0 0',
    padding: theme.spacing(1,2),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.gold.main,
    color: theme.palette.common.black,
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '12px',
  }
}),{name: 'GitBadge'})

const GitBadge = (props) => {
  const classes = useStyles()
  const gitInfo = GitInfo()

  return <Badge className={classes.root}>{gitInfo.branch}</Badge>
}

export default GitBadge