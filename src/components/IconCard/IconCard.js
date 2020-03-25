import React from 'react';
import { Link } from '@reach/router'
import { Badge, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import ConditionalWrapper from '../utils/ConditionalWrapper'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  card: {
    position: 'relative',
    width: '100%',
    minWidth: 100,
    height: '100%',
    minHeight: 250,
  },
  cardContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    padding: theme.spacing(4,3,3,3)
  },
  cardTitle: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 'bold',
    lineHeight: '32px',
    marginBottom: theme.spacing(1)
  },
  cardIcon: {
    maxWidth: 76,
    width: '100%'
  },
  cardTextContainer: {
    display: 'flex',
    marginLeft: theme.spacing(3),
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
  },
  cardText: {
    flexGrow: 1,
    '& a': {
      display: "inline-block",
      lineHeight: '22px',
      marginBottom: theme.spacing(1)
    }
  },
  cardActions: {
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1,0,0,0)
  }
}))

const IconCard = (props) => {
  const { t } = useTranslation('a_common')
  const {icon, title, altText, desc, link, linkText, count = 0, badgeText = t('badges.new'), cardClick} = props
  const classes = useStyles()

  const handleClick = (e) => {
    if (cardClick && e.currentTarget.tagName === "A") {
      return cardClick(e)
    }
  }

  return (
    <Card className={`${classes.card} IconCard`}>
      <ConditionalWrapper
        condition={count > 0}
        wrapper={children => <Badge className={classes.badge} badgeContent={badgeText} component="div">{children}</Badge>}>

        <CardContent className={`${classes.cardContent} IconCardContent`}>
          {icon && <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/${icon}`} alt={altText} aria-hidden="true" />}
          <div className={classes.cardTextContainer}>
            <div className={classes.cardText}>
              <Typography className={classes.cardTitle} variant="body2" component="h2">{title}</Typography>
              <Typography><RenderContent source={desc} /></Typography>
            </div>
            {link && (
              <CardActions className={classes.cardActions}>
                <Button color="primary" component={Link} to={link} onClick={handleClick}>
                  {linkText} <KeyboardArrowRightIcon className={classes.linkIcon} />
                </Button>
              </CardActions>
            )}
          </div>
        </CardContent>
        
      </ConditionalWrapper>
    </Card>
  )
}

export default IconCard