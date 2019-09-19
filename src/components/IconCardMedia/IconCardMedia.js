import React from 'react';
import { Link } from '@reach/router'
import { Button, Card, CardActionArea, CardActions, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowRight as KeyboardArrowRightIcon } from '@material-ui/icons'

const useStyles = makeStyles( theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: '146px',
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardActions: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2,0),
    margin: theme.spacing(0,2)
  }
}))

const Component = ({title, desc, image, imageTitle, link, linkText,}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`/${process.env.PUBLIC_URL}assets/images/${image}`}
          title={imageTitle}
        />
        <CardContent>
          <Typography className={classes.cardTitle} gutterBottom variant="body2">
            {title}
          </Typography>
          {desc &&
            <Typography variant="body2" color="textSecondary" component="p">
              {desc}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" component={Link} to={link}>
          {linkText} <KeyboardArrowRightIcon className={classes.linkIcon} />
        </Button>
      </CardActions>
    </Card>
  )
}

export default Component