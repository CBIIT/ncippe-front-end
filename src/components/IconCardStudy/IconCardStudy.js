import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import RenderContent from "../utils/RenderContent";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 45,
  height: 45,
  fontWeight: "bold",
  backgroundColor: "#fafafa",
  color: "#666666",
  margin: theme.spacing(1, 2, 0, -1),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: 278,
  minWidth: 100,
  height: 85,
  minHeight: 25,
  margin: theme.spacing(1),
  border: "solid #5B6DCD 2px",
  borderRadius: "25px",
  display: "inline-block",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
  fontWeight: "bold",
  lineHeight: "32px",
  marginBottom: theme.spacing(1),
}));

const CardIcon = styled("img")({
  maxWidth: 80,
  width: 80,
});

const CardTextContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginLeft: theme.spacing(3),
  flexGrow: 1,
  flexDirection: "column",
  height: "100%",
}));

const CardText = styled("div")(({ theme }) => ({
  flexGrow: 1,
  fontFamily: "Open Sans, sans-serif",
  display: "inline-block",
  lineHeight: "22px",
  marginBottom: theme.spacing(2),
}));

const CardActionsWrapper = styled("div")(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1, 0, 0, 0),
  marginTop: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat",
  fontWeight: "300", // use numeric weight instead of "light"
  fontSize: "16px",
  lineHeight: "1.25",
  color: "#183787",
  display: "flex",
}));
/**
 * This responsive card is a custom Material UI card designed to make it easy to drop in card elements while keeping a uniform style.
 */
const IconCardStudy = (props) => {
 
  const { t } = useTranslation("a_common");
  const {
    icon,
    title,
    altText = "icon",
    desc,
    count = 0,
  } = props;

  return (
    <StyledCard elevation={25}>
      <StyledCardContent className=" IconCardContent">
        <StyledAvatar aria-label="recipe" >
          {count}
        </StyledAvatar>
        <StyledTypography  variant="h6" component="h6" >
          <RenderContent children={desc} />
        </StyledTypography>
        <CardIcon
          src={`${process.env.PUBLIC_URL}/assets/icons/${icon}`}
          alt={altText}
          aria-hidden="true"
        />
      </StyledCardContent>
    </StyledCard>
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
