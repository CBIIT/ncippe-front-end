import React from 'react'
import { Badge, Card, CardContent, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import ConditionalWrapper from '../utils/ConditionalWrapper'

const useStyles = makeStyles( theme => ({
  badge: {
    width: '100%',

    '& .MuiBadge-badge': {
      top: '11px',
      right: '30px',
      borderRadius: '0 0 6px 6px',
      padding: '3px 10px',
      height: 'auto',
      textTransform: 'uppercase',
      backgroundColor: '#F6C674',
      color: '#000'
    },

    '& > div': {
      borderLeft: '5px solid #F6C674'
    }
    
  },
  card: {
    width: '100%',
    marginBottom: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2,0)
  }
}))

const NotificationItem = ({notification: {subject, from, message, generatedTime: time, viewedByUser}, handleClick}) => {
  const classes = useStyles()
  return (
    <ConditionalWrapper
      condition={!viewedByUser}
      wrapper={children => <Badge className={classes.badge} badgeContent="new" component="div">{children}</Badge>}
    >
      <Card onClick={handleClick} className={classes.card}>
        <CardContent>
          <Typography variant="h4" component="h2">{subject}</Typography>
          <Typography>{from}</Typography>
          <Typography>{time}</Typography>
          <Divider className={classes.divider} />
          <Typography dangerouslySetInnerHTML={{__html:message}} />
        </CardContent>
      </Card>
    </ConditionalWrapper>
  )
}

export default NotificationItem