import React, { useEffect, useState } from 'react'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import { FormControl, TextField,} from '@mui/material'
import { useTranslation } from 'react-i18next'

// move input cursor to first available placeholder character
const selectAfterUserInput = (event) => {
  const input = event.target
  let placeholder = '\u2000';
  let i = input.value.indexOf(placeholder)
  if (i === -1) { i = input.value.length; }
  setTimeout(function() { input.setSelectionRange(i, i); }, 0)
}

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { inputRef: inputRefProp, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ (maskedInputRef) => {
       if (maskedInputRef && inputRefProp) {
          inputRefProp(maskedInputRef.inputElement);
        }
      }}
      mask={['(', /[2-9]/, /\d/, /\d/, ')', ' ', /[2-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      onFocus={selectAfterUserInput}
    />
  );
});

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func,
};

const PhoneNumber = (props) => {
  const { value, editMode = false, error = false, onChange } = props
  const { t } = useTranslation('a_accountSettings')
  const [phoneNum, setPhoneNum] = useState(value || '(   )    -    ')

  useEffect(() => {
    setPhoneNum(value)
  }, [value])

  const handleChange = event => {
    setPhoneNum(event.target.value)
    // alert parent component to change
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <FormControl sx={{ minWidth: '200px',
      '& .MuiInput-formControl': {
        marginTop: 20
      },
      '& .MuiInput-underline:before': {
        display: 'none'
      }}} margin="normal">
      <TextField
        label={t('profile.phone.title')}
        error={error}
        value={phoneNum}
        onChange={handleChange}
        id="phone-number-input"
        variant={editMode ? 'outlined': 'standard'}
        
        helperText={editMode ? t('profile.phone.helper_text') : ''}
        InputProps={{
          inputComponent: TextMaskCustom,
          readOnly: !editMode
        }}
        InputLabelProps={{
          shrink: true,
          sx:{ fontWeight: 700,
            color: "text.primary",
            },
          error
        }}
        FormHelperTextProps={{
          sx: { mb: 2 }  
        }}
      />
    </FormControl>
  )
}

PhoneNumber.displayName = "PhoneNumber"
PhoneNumber.propTypes = {
  /**
   * The phone number formatted as (###)###-####
   */
  value: PropTypes.string,
  /**
   * Set this field to edit mode or read only mode
   */
  editMode: PropTypes.bool,
  /**
   * Flag this component as having an error
   */
  error: PropTypes.bool,
  /**
   * callback function passing the `value`
   */
  onChange: PropTypes.func,
}

export default PhoneNumber