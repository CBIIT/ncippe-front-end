import React from 'react';
import { Link } from '@reach/router'
import { Badge, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'

import ConditionalWrapper from '../utils/ConditionalWrapper'

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
    fontWeight: 'bold'
  },
  cardIcon: {
    paddingRight: theme.spacing(3),
    maxWidth: '100px',
    width: '100%'
  },
  cardText: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 600,
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.primary.main
  },
}))

const IconCard = ({icon, title, desc, link, linkText, count = 0, badgeText = 'new'}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <ConditionalWrapper
        condition={count > 0}
        wrapper={children => <Badge className={classes.badge} badgeContent={badgeText} component="div">{children}</Badge>}>

        <CardContent className={classes.cardContent}>
          {icon && <img className={classes.cardIcon} src={`/${process.env.PUBLIC_URL}assets/icons/${icon}`} alt='card icon' aria-hidden="true" />}
          <div className={classes.cardText}>
            <div>
              <Typography className={classes.cardTitle} variant="body2" component="h2">{title}</Typography>
              <Typography>{desc}</Typography>
            </div>
            <div>
              <Typography><Link className={classes.link} to={link}>{linkText} <KeyboardArrowRightIcon className={classes.linkIcon} /></Link></Typography>
            </div>
          </div>
        </CardContent>
        
      </ConditionalWrapper>
    </Card>
  )
}

export default IconCard