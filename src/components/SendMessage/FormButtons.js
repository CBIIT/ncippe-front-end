import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  rightButtons: {
    textAlign: 'right',
    '& button': {
      marginLeft: theme.spacing(2)
    }
  },
}),{name: 'FormButtons'})

const FormButtons = (props) => {
  const classes = useStyles()
  const { leftButtons, rightButtons } = props

  return (
    <div className={classes.formButtons}>
      {leftButtons && 
        <div className={classes.leftButtons}>
          {leftButtons}
        </div>
      }
      {rightButtons &&
        <div className={classes.rightButtons}>
          {rightButtons}
        </div>
      }
    </div>
  )
}

export default FormButtons