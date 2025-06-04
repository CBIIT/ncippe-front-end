import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@mui/icons-material'

import RenderContent from '../utils/RenderContent'
/**
 * This responsive card is a custom Material UI card designed to make it easy to drop in card elements while keeping a uniform style. It does not display an icon despite the component name. It was modeled off the IconCard.
 */
const IconCardMedia = (props) => {
  const {title, desc, image, imageTitle, link, linkText} = props

  return (
    <Card sx={{ height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'}} elevation={25}>
      <div>
        <CardMedia
          sx={{ height: 146 }}
          image={image}
          title={imageTitle}
        />
        <CardContent>
          <Typography sx={{ fontWeight: 'bold'}} gutterBottom variant="body2" component="h4">
            {title}
          </Typography>
          {desc &&
            <Typography component="div">
              <RenderContent children={desc} />
            </Typography>
          }
        </CardContent>
      </div>
      {link && <CardActions sx={{
            borderTop: theme => `1px solid ${theme.palette.grey[300]}`,
            py: 2,       // paddingY
            my: 0,       // marginY
            mx: 2        // marginX
          }}>
        <Button color="primary" component={Link} to={link}>
          {linkText} <KeyboardArrowRightIcon  />
        </Button>
      </CardActions>}
    </Card>
  )
}

IconCardMedia.displayName = "IconCardMedia"
IconCardMedia.propTypes = {
  /**
   * The title for this card
   */
  title: PropTypes.string.isRequired,
  /**
   * Optional descriptive text as text, html or markdown
   */
  desc: PropTypes.string,
  /**
   * The image file path. This file is loaded as a background image on a `div` element to take advantage of the `background-size: cover` style.  The root for media cards is `/assets/images/mediaCard/`. Within the root folder are folders for both `HD` and `standard` sized images. If attempting to load an appropriate sized image then dynamically set the path using `useMediaQuery('@media (min-resolution: 192dpi)')` as the quantifier.
   */
  image: PropTypes.string.isRequired,
  /**
   * Descriptive text for the image. It is added as a `title` attribute for accessibility
   */
  imageTitle: PropTypes.string.isRequired,
  /**
   * the URL for a link provided at the bottom of the card. `linkText` is required if link is provided
   */
  link: PropTypes.string,
  /**
   * the text for a link provided at the bottom of the card. `link` is required if linkText is provided
   */
  linkText: PropTypes.string
}

export default IconCardMedia