import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Card, CardContent, Grid, Typography, Divider } from '@material-ui/core'
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
}),{name: 'NotificationItem'})

/**
 * A simple internal message notification displayed in a Material-UI Card
 */
const NotificationItem = (props) => {
  const {
    notification: {
      subject, 
      message, 
      dateGenerated, 
      viewedByUser
    } = {}, 
    lang = navigator.language
  } = props
  const classes = useStyles()
  return (
    <Card className={classes.card} elevation={25}>
      <ConditionalWrapper
        condition={!viewedByUser}
        wrapper={children => <Badge className={classes.badge} badgeContent="new" component="div">{children}</Badge>}
      >
        <CardContent className={classes.cardContent}>
          <Typography variant="h3" component="h3"><RenderContent source={subject[lang]} /></Typography>
          <Grid container>
            <Grid item xs={12} sm={4} md={2}>
              <Typography>{moment(dateGenerated).format("MMM DD, YYYY")}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Typography component="div">
            <RenderContent source={message[lang]} />
          </Typography>
        </CardContent>
      </ConditionalWrapper>
    </Card>
  )
}

NotificationItem.displayName = "NotificationItem"
NotificationItem.propTypes = {
  /**
   * The notification object
   */
  notification: PropTypes.shape({
    /**
     * The subject line for the notification in English and/or Spanish
     */
    subject: PropTypes.shape({
      /**
       * The subject text in English as text, html or markdown
       */
      en: PropTypes.string,
      /**
       * The subject text in Spanish as text, html or markdown
       */
      es: PropTypes.string,
    }),
    /**
     * The message content for the notification in English and/or Spanish
     */
    message: PropTypes.shape({
      /**
       * The message text in English as text, html or markdown
       */
      en: PropTypes.string,
      /**
       * The message text in English as text, html or markdown
       */
      es: PropTypes.string,
    }),
    /**
     * The date this messages was sent as a raw `datestamp` number. The date format locale is set on login based on the user's language preference
     */
    dateGenerated: PropTypes.number, 
    /**
     * Flag if this message has been viewed by the user. Possible values are `0` or `1` for some reason and evaluated in code as boolean. If `false` then this message will display a "new" badge
     */
    viewedByUser: PropTypes.bool,
  }),
  /**
   * The language this message should be viewed in. This value should be prop drilled down from a parent component with access to the User Context language settings.
   */
  lang: PropTypes.oneOf(['en','es']),
}
export default NotificationItem