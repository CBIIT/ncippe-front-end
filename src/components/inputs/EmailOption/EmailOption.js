import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '200px'
  },
  formLegend: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left'
  }
}));

const EmailOption = (props) => {
  const {value, editMode, onClick} = props
  const classes = useStyles()
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
    return setChecked(value)
  }, [value])

  const handleChange = () => {
    setChecked(!checked)
    if(onClick) {
      // alert parent component to change
      onClick(!checked)
    }
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel 
      htmlFor="notifications-input" 
      component="legend" 
      className={classes.formLegend}>Notification settings</FormLabel>
      {editMode ? (
        <FormControlLabel
          control={
            <Checkbox 
            id="notifications-input"
            color="primary" 
            checked={checked} 
            onChange={handleChange} />
          }
          label="Send email notifications (recommended)"
          labelPlacement="end"
        />
      ) : (
        <span>Notifications {checked ? "on" : "off"}</span>
      )}
    </FormControl>
  )
}

EmailOption.propTypes = {
  /**
   * The phone number formatted as (###)###-####
   */
  value: PropTypes.bool,
  /**
   * Set this field to edit mode or read only mode
   */
  editMode: PropTypes.bool,
};

EmailOption.defaultProps = {
  value: true,
  editMode: false
}

export default EmailOption