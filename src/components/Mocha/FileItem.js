import React from 'react'
import { Typography, Paper, Grid, IconButton } from '@material-ui/core'
import { 
  Clear as ClearIcon,
  PictureAsPdf as PictureAsPdfIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

const useStyles = makeStyles( theme => ({
  fileToUpload: {
    margin: theme.spacing(1, 0),
    maxWidth: '500px',
    '& .MuiGrid-root': {
      flexWrap: 'nowrap',
    },
  },
  fileToUpload_icon: {
    margin: theme.spacing(2, 0, 2, 2)
  },
  fileToUpload_title: {
    fontWeight: theme.typography.fontWeightBold
  },
  fileToUpload_content: {
    margin: theme.spacing(2, 2, 2, 1),
    flexGrow: 1
  },
  fileToUpload_clear: {
    alignSelf: 'center',
    marginRight: theme.spacing(1)
  }
}))

const FileItem = (props) => {
  const {file,onRemove} = props
  const classes = useStyles()

  const handleRemoveFile = (e) => {
    onRemove()
  }

  return (
    <Paper className={classes.fileToUpload} elevation={2}>
      <Grid container>
        <Grid item className={classes.fileToUpload_icon}>
          <PictureAsPdfIcon />
        </Grid>
        <Grid item className={classes.fileToUpload_content}>
          <Typography className={classes.fileToUpload_title}>{file.name}</Typography>
          <Typography>Last modified: {moment(file.lastModified).format("MMM DD, YYYY")}</Typography>
        </Grid>
        <Grid item className={classes.fileToUpload_clear}><IconButton aria-label="remove file" onClick={handleRemoveFile}><ClearIcon /></IconButton></Grid>
      </Grid>
    </Paper>
  )
}

export default FileItem
