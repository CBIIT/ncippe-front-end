import React from 'react';
import PropTypes from 'prop-types';
import MuiCard from '@material-ui/core/Card';

const Card = (props) => {
  return <MuiCard {...props} />
}

Card.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

Card.displayName = 'Card';

export default Card