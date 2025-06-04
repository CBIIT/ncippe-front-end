import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Badge, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import ConditionalWrapper from '../utils/ConditionalWrapper'
import RenderContent from '../utils/RenderContent'

/**
 * This responsive card is a custom Material UI card designed to make it easy to drop in card elements while keeping a uniform style. 
 */
const IconCard = (props) => {
  const { t } = useTranslation('a_common')
  const {
    icon, 
    title, 
    altText = 'icon', 
    desc, 
    link, 
    linkText, 
    count = 0, 
    badgeText = t('badges.new'), 
    download = false, 
    cardClick
  } = props

  const handleClick = (e) => {
    if (cardClick && e.currentTarget.tagName === "A") {
      return cardClick(e)
    }
  }

  return (
    <Card elevation={25} 
    sx={{
      position: 'relative',
      width: '100%',
      minWidth: 100,
      height: '100%',
      minHeight: 250,
    }}>
      {/* <ConditionalWrapper
        condition={count > 0}
        wrapper={children => 
          <Badge  sx={{ position: 'absolute' }}  badgeContent={badgeText} component="div">{children}</Badge>}> */}
        {count > 0 && (
          <Box  sx={{
        position: 'absolute',
        top: 16,
        right: 32,
        zIndex: 2,
      }}>
            <Badge badgeContent={ badgeText } ></Badge>
          </Box>
        )}

        <CardContent className="IconCardContent" sx={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: (theme) => theme.spacing(4, 3, 3, 3),
            width: '100%', height: '100%',
          }}>
          {icon && <Box component='img' sx={{ maxWidth: 76, width: '100%' }} 
           src={`${process.env.PUBLIC_URL}/assets/icons/${icon}`} 
           alt={altText} aria-hidden="true" /> }
         <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            marginLeft: 3,
            height: '100%',
          }}>      
           <Box sx={{
              flexGrow: 1,
              '& a': {
              display: 'inline-block',
              lineHeight: '22px',
              mb: 1,
            },
            }}>
              <Typography sx={{
                fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                lineHeight: '32px',
                mb: 1,
              }} variant="body2" component="h2">{title}</Typography>
              <Typography component="div"><RenderContent children={desc} />
              </Typography>
            </Box>
            {link && (
              <CardActions sx={{
                  borderTop: (theme) => `2px solid ${theme.palette.grey[300]}`,
                  pt: 1, mt: 1, px: 0, }}>
                {download ? 
                  <Button
                    href={link} color="primary" 
                    rel="noopener noreferrer" 
                    target="_blank">
                      {linkText} <KeyboardArrowRightIcon sx={{ ml: 1 }}  />
                  </Button>
                  :
                  <Button color="primary" component={Link} to={link} onClick={handleClick}>
                    {linkText} <KeyboardArrowRightIcon sx={{ ml: 1 }}  />
                  </Button>
                }
              </CardActions>
            )}
          </Box>
        </CardContent>        
      
    </Card>
  )
}

IconCard.displayName = "IconCard"
IconCard.propTypes = {
  /**
   * assign any icon file from the `/public/assets/icons` folder, including the file extension
   */
  icon: PropTypes.string.isRequired,
  /**
   * the title for this card
   */
  title: PropTypes.string.isRequired,
  /**
   * the alt text for the icon image. The icon is hidden to screen readers, but the alt text attribute is still required by validators
   */
  altText: PropTypes.string,
  /**
   * The description text as text, html or markdown
   */
  desc: PropTypes.string.isRequired,
  /**
   * the URL for a link provided at the bottom of the card. `linkText` is required if link is provided
   */
  link: PropTypes.string,
  /**
   * the text for a link provided at the bottom of the card. `link` is required if linkText is provided
   */
  linkText: PropTypes.string,
  /**
   * If a count has been provided and is greater then 0 or is `true`, then the badge will appear with the supplied `badgeText`. This is used for mostly for marking new notifications and report when newNotifications or newReports has been set in the user data.
   */
  count: PropTypes.oneOfType([PropTypes.number,PropTypes.bool]),
  /**
   * The text that appears in a badge when triggered by `count`
   */
  badgeText: PropTypes.string,
  /**
   * If true, then the `link` provided will open in a new window or tab. This is used to download and preview pdf files in a new browser window or tab
   */
  download: PropTypes.bool,
  /**
   * callback event for `link` clicks. Mostly used by analytics.
   */
  cardClick: PropTypes.func
}
export default IconCard