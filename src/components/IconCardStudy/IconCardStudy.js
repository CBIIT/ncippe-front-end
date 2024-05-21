import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BorderOuterOutlined, KeyboardArrowRight as KeyboardArrowRightIcon } from "@material-ui/icons";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { useTranslation } from "react-i18next";

import ConditionalWrapper from "../utils/ConditionalWrapper";
import RenderContent from "../utils/RenderContent";
import { grey } from "@material-ui/core/colors";
import { color } from "d3";

const useStyles = makeStyles(
  (theme) => ({
    avatar:{
      width:45,
      height:45,
      fontWeight: "bold",
      backgroundColor: "#fafafa",
      color: "#666666",
      margin: theme.spacing(1, 2, 0, -1),
    },
    card: {
      // position: 'relative',
      width: "278",
      minWidth: 100,
      height: "85",
      minHeight: 25,
      margin: theme.spacing(2),
      //BorderOuterOutlined: "solid #5B6DCD 10px",
      border: "solid #5B6DCD 2px",
      borderRadius: "25px",
      display: "inline-block",
    },
    cardContent: {
      display: "flex",
      height: "100%",
      width: "100%",
      // position: 'absolute', // Don't know why this was set to absolute? IE?
      alignItems: "center",
      //padding: theme.spacing(4,3,3,3)
    },
    cardTitle: {
      fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      lineHeight: "32px",
      marginBottom: theme.spacing(1),
    },
    cardIcon: {
      maxWidth: 80,
      width: 80,
    },
    cardTextContainer: {
      display: "flex",
      marginLeft: theme.spacing(3),
      flexGrow: 1,
      flexDirection: "column",
      height: "100%",
    },
    cardText: {
      flexGrow: 1,
      fontFamily: "Open Sans, sans-serif",
      display: "inline-block",
      lineHeight: "22px",
      marginBottom: theme.spacing(2),
    },
    cardActions: {
      borderTop: `2px solid ${theme.palette.grey[300]}`,
      padding: theme.spacing(1, 0, 0, 0),
      marginTop: theme.spacing(1),
    },
    typography: {
   
        fontFamily: "Montserrat",
        fontWeight: "light",
        fontSize: "16px",
        lineHeight: '1.25',
        color:'#183787',
        alignItems:'center',
    
    },
  }),
  { name: "IconCardStudy" }
);

/**
 * This responsive card is a custom Material UI card designed to make it easy to drop in card elements while keeping a uniform style.
 */
const IconCardStudy = (props) => {
  const classes = useStyles();
  const { t } = useTranslation("a_common");
  const {
    icon,
    title,
    altText = "icon",
    desc,
    count = 0,
  } = props;

  return (
    <Card className={classes.card} elevation={25}>
      <CardContent className={`${classes.cardContent} IconCardContent`}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          {count}
        </Avatar>
        <Typography className={classes.typography} variant="h6" component="h6" alignItems='center'>
          <RenderContent children={desc} />
        </Typography>
        <img
          className={classes.cardIcon}
          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}`}
          alt={altText}
          aria-hidden="true"
        />
      </CardContent>
    </Card>
  );
};

IconCardStudy.displayName = "IconCardStudy";
IconCardStudy.propTypes = {
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
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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
  cardClick: PropTypes.func,
};

export default IconCardStudy;
