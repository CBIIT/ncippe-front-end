import React from 'react'
import { Badge, Card, CardContent, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import ConditionalWrapper from '../utils/ConditionalWrapper'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  badge: {
    display: 'block',

    '& .MuiBadge-badge': {
      right: theme.spacing(3),
      transform: 'none',
      borderRadius: '0 0 6px 6px',
      padding: theme.spacing(1,2),
      textTransform: 'uppercase',
      backgroundColor: theme.palette.gold.main,
      color: theme.palette.common.black,
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '12px',
      height: 'auto',
    },

    '& > div': {
      borderLeft: '10px solid #F6C674',
      paddingLeft: `calc(${theme.spacing(7)}px - 10px)`
    }
    
  },
  card: {
    position: 'relative',
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    padding: theme.spacing(4,3,4,7),
    '&:last-child': {
      paddingBottom: theme.spacing(4)
    },
  },
  divider: {
    margin: theme.spacing(2,0)
  }
}))

const NotificationItem = (props) => {
  const {notification: {subject, from, message, dateGenerated, viewedByUser}, handleClick} = props
  const classes = useStyles()
  return (
    <Card onClick={handleClick} className={classes.card}>
      <ConditionalWrapper
        condition={!viewedByUser}
        wrapper={children => <Badge className={classes.badge} badgeContent="new" component="div">{children}</Badge>}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h3" component="h3">{subject}</Typography>
          <Grid container>
            <Grid item xs={12} sm={4} md={2}>
              <Typography>{moment(dateGenerated).format("MMM DD, YYYY")}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography>
            <RenderContent source={message} />
          </Typography>
        </CardContent>
      </ConditionalWrapper>
    </Card>
  )
}

export default NotificationItem