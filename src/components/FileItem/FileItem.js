import React from 'react'
import { Typography, Paper, Grid, IconButton } from '@mui/material'
import { 
  Clear as ClearIcon,
  PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const FileItem = ({file,onRemove}) => {
  const { t } = useTranslation('a_common')

  const handleRemoveFile = (e) => {
    onRemove()
  }

  return (
    <Paper elevation={25} sx={{
        m: 1,
        maxWidth: 500,
        '& .MuiGrid-root': {
          flexWrap: 'nowrap',
        },
      }}>
      <Grid container>
        <Grid sx={{ m:2 }}>
          <PictureAsPdfIcon />
        </Grid>
        <Grid sx={{ m:2, ml:1, flexGrow: 1 }} >
          <Typography sx={{ fontWeight:'bold'}}>{file.name}</Typography>
          <Typography>{t('components.fileItem.last_modified')}: {moment(file.lastModified).format("MMM DD, YYYY")}</Typography>
        </Grid>
        <Grid sx={{ alignSelf:'center', mr:1 }}><IconButton
          aria-label={t('aria.remove_file')}
          onClick={handleRemoveFile}
          size="large"><ClearIcon /></IconButton></Grid>
      </Grid>
    </Paper>
  );
}

export default FileItem
