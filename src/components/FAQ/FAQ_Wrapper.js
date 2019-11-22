import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  RemoveRounded as MinusIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import FAQ from './FAQ'

const useStyles = makeStyles( theme => ({
  faq_title: {
    display: 'flex',
    '& h3': {
      flexGrow: 1
    }
  },
  faq_icon: {
    marginLeft: -8,
    marginRight: 4
  }
}))

const FAQs = (props) => {
  const { title,faqs, className, ...other } = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('common')
  const [isExpanded, setIsExpanded] = useState(0)

  const toggleAll = () => {
    setIsExpanded(prev => prev + 1)
  }

  return (
    <Container className={`innerContainer ${className}`} {...other}>
    <div className={classes.faq_title}>
      <Typography variant="h3" component="h3">{title}</Typography>
      <Button variant="outlined" color="primary" onClick={toggleAll}><MinusIcon className={classes.faq_icon} /> {t('buttons.collapse')}</Button>
    </div>
    <Box mt={3}>
      {faqs && Object.keys(faqs).map((faq, i) => <FAQ
        key={i} 
        title={faqs[faq].question}
        desc={faqs[faq].answer}
        expanded={isExpanded}
      />)}
    </Box>
  </Container>
  )
}

export default FAQs