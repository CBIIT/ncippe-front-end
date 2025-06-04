import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import RenderContent from '../utils/RenderContent'

/**
 * Display a simple and reusable "No Items" message. This component is used for notifications, biomarker reports and consent forms
 */
const NoItems = ({ message = 'No items to display'} ) => {

  return (
    <Grid container sx={{
        flexWrap: 'nowrap',
        mt: 4,
        '& > div:last-of-type': {
          maxWidth: '300px',
        },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
      }}>
      <Grid>
        <Box component="img" sx={{
            width: '140px',
            mr: { xs: 0, sm: 3 },
            mb: { xs: 2, sm: 0 },
          }}
        src={`${process.env.PUBLIC_URL}/assets/icons/empty-folder.svg`} alt='empty folder icon' aria-hidden="true">
        </Box>
      </Grid>
      <Grid>
        <Typography  sx={{
            fontWeight: 'bold',
            textAlign: { xs: 'center', sm: 'left' },
          }}><RenderContent children={message} /></Typography>
      </Grid>
    </Grid>
  );
}

NoItems.displayName = "NoItems"
NoItems.propTypes = {
  /**
   * A message to display below the empty folder image
   */
  message: PropTypes.string
}

export default NoItems