import React from 'react'
import PropTypes from 'prop-types'
import { Box, Badge, Card, CardActions, CardContent, Typography, Button } from '@mui/material'
import {
  GetApp as GetAppIcon,
  Launch as LaunchIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import PubSub from 'pubsub-js'

import ConditionalWrapper from '../utils/ConditionalWrapper'

const FileListItem = ({ file, noBadge, eventName = 'VIEW_DOCUMENT_ITEM' }) => {
  const {fileName, dateUploaded, fileGUID, viewedByUser = false} = file
  const { t } = useTranslation('a_common')
 
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
    <Card sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        mb: 2,
        p: 2,
      }} elevation={25}>
      { !noBadge && !viewedByUser && (
        <Box sx={{
        position: 'absolute',
        top: 16,
        right: 80,
        zIndex: 2,
      }}>
            <Badge sx={{
      '& .MuiBadge-badge': {
        borderRadius: '0 0 6px 6px',
        padding: '8px 12px 6px',
        backgroundColor: '#ffb73d',
        color: '#000',
        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1',
        textAlign: 'center',
        minWidth: 'auto',
        whiteSpace: 'nowrap',
      }
    }} badgeContent={t('badges.new_document')} ></Badge> 
        </Box>)}
        <CardContent>
          <Typography className="breakAll" variant="h3" component="h3">{fileName}</Typography>
          <Typography>{t('components.testResultItem.uploaded')} {moment(dateUploaded).format("MMM DD, YYYY")}</Typography>
        </CardContent>
        <CardActions sx={{
            justifyContent: 'space-between',
            borderTop: '2px solid #cfd2d8',
            mx: 2,
            pt: 2,
            [theme => theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              '& > :not(:first-child)': {
                mt: 1,
              },
            },
            [theme => theme.breakpoints.up('xs')]: {
              '& a:last-of-type': {
                alignSelf: 'flex-end',
              },
            },
          }} >
          {/* isIE ? <Typography component="div" /> : <Button color="primary" variant="text" data-fileid={fileGUID} onClick={handleViewFile}><LaunchIcon className={classes.icon} /> {t('buttons.view')}</Button> */}
          <Button color="primary" variant="text" data-fileid={fileGUID} onClick={handleViewFile}>
            <LaunchIcon sx={{ mr: 0.5 }} /> {t('buttons.view')}</Button>
          <Button color="primary" variant="text" data-download data-fileid={fileGUID} 
          onClick={handleViewFile}>
            <GetAppIcon sx={{ mr: 0.5 }}  /> {t('buttons.download')}</Button>
        </CardActions>
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