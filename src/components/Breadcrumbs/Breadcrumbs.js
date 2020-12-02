import React from 'react'
import PropTypes from 'prop-types'
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
}),{name: 'Breadcrumbs'})
/**
 * This component has been stripped down since it's inception to be just a simple Back button
 */
const Breadcrumbs = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('a_common')
  const handleClick = () => {
    if(props.link) {
      navigate(props.link)
    } else {
      navigate(-1)
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
Breadcrumbs.propTypes = {
  /**
   * a link for the back button if it's not a simple history back request
   */
  link: PropTypes.string
}