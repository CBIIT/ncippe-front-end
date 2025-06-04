import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Card, CardContent, Grid, Typography, Divider } from '@mui/material'
import moment from 'moment'

import ConditionalWrapper from '../utils/ConditionalWrapper'
import RenderContent from '../utils/RenderContent'


/**
 * A simple internal message notification displayed in a Material-UI Card
 */
const NotificationItem = ({ 
  notification: { subject, message, dateGenerated, viewedByUser } = {}, 
  lang = navigator.language }) => {
  
  return (
    <Card sx={{ position: 'relative', mb: 2 }} elevation={25}>
      <ConditionalWrapper
        condition={!viewedByUser}
        wrapper={children => 
        <Badge           sx={{
              display: 'block',
              '& .MuiBadge-badge': {
                right: theme => theme.spacing(3),
                transform: 'none',
                borderRadius: '0 0 6px 6px',
                padding: theme => theme.spacing(1, 2),
                textTransform: 'uppercase',
                backgroundColor: theme => theme.palette.gold.main,
                color: theme => theme.palette.common.black,
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '12px',
                height: 'auto',
              },
              '& > div': {
                borderLeft: '10px solid #F6C674',
                paddingLeft: theme => `calc(${theme.spacing(7)} - 10px)`
              }
            }} badgeContent="new" component="div">{children}
        </Badge>}
      >
        <CardContent sx={{
            padding: theme => theme.spacing(4, 3, 4, 7),
            '&:last-child': {
              paddingBottom: theme => theme.spacing(4)
            }
          }}>
          <Typography variant="h3" component="h3"><RenderContent children={subject[lang]} /></Typography>
          <Grid container>
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}>
              <Typography>{moment(dateGenerated).format("MMM DD, YYYY")}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography component="div">
            <RenderContent children={message[lang]} />
          </Typography>
        </CardContent>
      </ConditionalWrapper>
    </Card>
  );
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
       * Multi-line message text in English as text, html or markdown
       */
      en: PropTypes.string,
      /**
       * Multi-line message text in English as text, html or markdown
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
    viewedByUser: PropTypes.oneOfType([PropTypes.bool,PropTypes.number]),
  }),
  /**
   * The language this message should be viewed in. This value should be prop drilled down from a parent component with access to the User Context language settings.
   */
  lang: PropTypes.oneOf(['en','es']),
}
export default NotificationItem