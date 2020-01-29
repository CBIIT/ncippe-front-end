import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: '200px',
    '& .MuiInput-formControl': {
      marginTop: 20
    }
  },
  label: {
    fontWeight: 700,
    color: theme.palette.text.primary,
    transform: "none"
  }
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

const PhoneNumber = (props) => {
  const { value, editMode, error = false, onChange } = props
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
    <FormControl className={classes.formControl} margin="normal">
      <InputLabel 
        htmlFor="phone-number-input" 
        shrink 
        error={error}
        className={classes.label}
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