import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Badge, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import ConditionalWrapper from '../utils/ConditionalWrapper'
import RenderContent from '../utils/RenderContent'

const useStyles = makeStyles( theme => ({
  card: {
    position: 'relative',
    width: '100%',
    minWidth: 100,
    height: '100%',
    minHeight: 250,
  },
  cardContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-start',
    padding: theme.spacing(4,3,3,3)
  },
  cardTitle: {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 'bold',
    lineHeight: '32px',
    marginBottom: theme.spacing(1)
  },
  cardIcon: {
    maxWidth: 76,
    width: '100%'
  },
  cardTextContainer: {
    display: 'flex',
    marginLeft: theme.spacing(3),
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
  },
  cardText: {
    flexGrow: 1,
    '& a': {
      display: "inline-block",
      lineHeight: '22px',
      marginBottom: theme.spacing(1)
    }
  },
  cardActions: {
    borderTop: `2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1,0,0,0),
    marginTop: theme.spacing(1)
  }
}),{name: 'IconCard'})

/**
 * This responsive card is a custom Material UI card designed to make it easy to drop in card elements while keeping a uniform style. 
 */
const IconCard = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('a_common')
  const {
    icon, 
    title, 
    altText, 
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
    <Card className={`${classes.card} IconCard`} elevation={25}>
      <ConditionalWrapper
        condition={count > 0}
        wrapper={children => <Badge className={classes.badge} badgeContent={badgeText} component="div">{children}</Badge>}>

        <CardContent className={`${classes.cardContent} IconCardContent`}>
          {icon && <img className={classes.cardIcon} src={`${process.env.PUBLIC_URL}/assets/icons/${icon}`} alt={altText} aria-hidden="true" />}
          <div className={classes.cardTextContainer}>
            <div className={classes.cardText}>
              <Typography className={classes.cardTitle} variant="body2" component="h2">{title}</Typography>
              <Typography component="div"><RenderContent source={desc} /></Typography>
            </div>
            {link && (
              <CardActions className={classes.cardActions}>
                {download ? 
                  <Button
                    href={link} color="primary" 
                    rel="noopener noreferrer" 
                    target="_blank">
                      {linkText} <KeyboardArrowRightIcon className={classes.linkIcon} />
                  </Button>
                  :
                  <Button color="primary" component={Link} to={link} onClick={handleClick}>
                    {linkText} <KeyboardArrowRightIcon className={classes.linkIcon} />
                  </Button>
                }

              </CardActions>
            )}
          </div>
        </CardContent>
        
      </ConditionalWrapper>
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
   * the alt text for the icon image
   */
  altText: PropTypes.string.isRequired,
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
   * If a count has been provided and is greater then 0, then the badge will appear with the supplied `badgeText`. This is used for mostly for marking new notifications and report when newNotifications or newReports has been set in the user data.
   */
  count: PropTypes.number,
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