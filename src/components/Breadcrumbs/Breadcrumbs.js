import React from 'react'
import { navigate } from '@reach/router'
import { Container, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArrowBack } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  Breadcrumbs: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  back: {
    fontSize: theme.typography.h6.fontSize,
    lineHeight: 0,
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
    '@media (min-width: 880px)': {
      marginLeft: theme.spacing(4),
    }
  },
  backIcon: {
    marginRight: theme.spacing(1)
  }
}))

const Breadcrumbs = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('a_common')
  const handleClick = () => {
    if(props.link) {
      navigate(props.link)
    } else {
      window.history.back()
    }
  }
  return (
    <Container className={classes.Breadcrumbs}>
      <Typography>
        <Button className={`${classes.back} backButton`} color="primary" variant="text" onClick={handleClick}><ArrowBack className={classes.backIcon} /> {t('buttons.back')}</Button>
      </Typography>
    </Container>
  )
}

export default Breadcrumbs