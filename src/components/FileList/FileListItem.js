import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import PubSub from 'pubsub-js'

import ConditionalWrapper from '../utils/ConditionalWrapper'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2,1),
  },
  cardAction: {
    justifyContent: 'space-between',
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    margin: theme.spacing(0,2),
    padding: theme.spacing(2,0,0,0),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      "& > :not(:first-child)": {
        margin: 0
      }
    },

    [theme.breakpoints.up('xs')]: {
      '& a:last-of-type': {
        alignSelf: 'flex-end',
      }
    }

  },
  gridItem: {
    width: '33.333333%',

    '& $card': {
      height: '100%'
    }
  },
  icon: {
    marginRight: '4px'
  },
  badge: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}),{name: 'FileListItem'})

const FileListItem = (props) => {
  const {file, noBadge, eventName = 'VIEW_DOCUMENT_ITEM'} = props
  const classes = useStyles()
  const {fileName, dateUploaded, fileGUID, viewedByUser = false} = file
  const { t } = useTranslation('a_common')
  // const isIE = /*@cc_on!@*/false || !!document.documentMode

  // response header example to parse
  //Content-Disposition: attachment; filename=dummy_PatientFile - Copy8322721829336469280.pdf

  const handleViewFile = (event) => {
    event.preventDefault()
    PubSub.publish(eventName, {
      file,
      download: event.currentTarget.dataset.download,
      linkText: event.target.textContent
    })
    if (event.ctrlKey || event.metaKey) {
      return false;
    }
  }

  return (
    <Card className={classes.card} elevation={25}>
      <ConditionalWrapper
        condition={noBadge ? false : !viewedByUser}
        wrapper={children => <Badge className={classes.badge} badgeContent={t('badges.new_document')} component="div">{children}</Badge>}>
        <CardContent>
          <Typography className="breakAll" variant="h3" component="h3">{fileName}</Typography>
          <Typography>{t('components.testResultItem.uploaded')} {moment(dateUploaded).format("MMM DD, YYYY")}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          {/* isIE ? <Typography component="div" /> : <Button color="primary" variant="text" data-fileid={fileGUID} onClick={handleViewFile}><LaunchIcon className={classes.icon} /> {t('buttons.view')}</Button> */}
          <Button color="primary" variant="text" data-fileid={fileGUID} onClick={handleViewFile}><LaunchIcon className={classes.icon} /> {t('buttons.view')}</Button>
          <Button color="primary" variant="text" data-download data-fileid={fileGUID} onClick={handleViewFile}><GetAppIcon className={classes.icon}  /> {t('buttons.download')}</Button>
        </CardActions>
      </ConditionalWrapper>
    </Card>
  )
}

FileListItem.displayName = 'FileListItem'
FileListItem.propTypes = {
  /**
   * The file object to be rendered. Could be a Biomarker Report, Consent Form or Other Document
   */
  file: PropTypes.shape({
    /**
     * The name of the file
     */
    fileName: PropTypes.string.isRequired,
    /**
     * The `timestamp` date when this file was uploaded to the system
     */
    dateUploaded: PropTypes.number.isRequired,
    /**
     * The unique identifier of this file
     */
    fileGUID: PropTypes.string.isRequired,
    /**
     * Flag if this files have been downloaded or viewed by the current user. If this file has not been viewed yet then it will have a "New Document" badge
     */
    viewedByUser: PropTypes.bool
  }), 
  /**
   * Override displaying a badge on this item
   */
  noBadge: PropTypes.bool,
  /**
   * The name of the event to be triggered when this file item is clicked on or "viewed"
   */
  eventName: PropTypes.string
}

export default FileListItem