import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '200px'
  },
}));

// move input cursor to first available placeholder character
const selectAfterUserInput = (event) => {
  const input = event.target
  let placeholder = '\u2000';
  let i = input.value.indexOf(placeholder)
  if (i === -1) { i = input.value.length; }
  setTimeout(function() { input.setSelectionRange(i, i); }, 0);
}

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[2-9]/, /\d/, /\d/, ')', ' ', /[2-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      onFocus={selectAfterUserInput}
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const PhoneNumber = ({ value, editMode, error = false, onChange }) => {
  const classes = useStyles();
  const [phoneNum, setPhoneNum] = useState({
    textmask: value || '(   )    -    '
  });

  useEffect(() => {
    setPhoneNum({
      textmask: value
    })
  }, [value])

  const handleChange = name => event => {
    setPhoneNum({
      ...phoneNum,
      [name]: event.target.value,
    });
    // alert parent component to change
    if (onChange) {
      onChange(event.target.value)
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel 
        htmlFor="phone-number-input" 
        shrink 
        error={error}
      >
        Phone number (optional)
      </InputLabel>
      <Input
        error={error}
        value={phoneNum.textmask}
        onChange={handleChange('textmask')}
        id="phone-number-input"
        inputComponent={TextMaskCustom}
        variant="outlined"
        readOnly={!editMode}
        />
      {editMode && <FormHelperText>Enter your preferred contact number.</FormHelperText>}
    </FormControl>
  )
}
PhoneNumber.propTypes = {
  
  /**
   * The phone number formatted as (###)###-####
   */
  value: PropTypes.string,
  /**
   * Set this field to edit mode or read only mode
   */
  editMode: PropTypes.bool,
};

export default PhoneNumber