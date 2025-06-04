import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

/**
 * This component has been stripped down since it's inception to be just a simple Back button
 */
const Breadcrumbs = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('a_common')
  const handleClick = () => {
    if(props.link) {
      navigate(props.link)
    } else {
      navigate(-1)
    }
  }
  return (
    <Container sx={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 3,
    }}>
      <Typography>
        <Button className="backButton" sx={theme => ({
            fontSize: theme.typography.h6.fontSize,
            lineHeight: 0,
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            ml: {
              sm: 2,
              '@media (min-width:880px)': 4,
            },
            '& .backIcon': {
              mr: 1,
            }
          })} color="primary" variant="text" onClick={handleClick}>
            <ArrowBack sx={{ ml: 1 }} /> {t('buttons.back')}</Button>
      </Typography>
    </Container>
  )
}

Breadcrumbs.displayName = "Breadcrumbs"
Breadcrumbs.propTypes = {
  /**
   * a link for the back button if it's not a simple history back request
   */
  link: PropTypes.string
}

export default Breadcrumbs