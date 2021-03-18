import React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import InputGroupError from './InputGroupError'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default {
  title: 'Components/Inputs/InputGroupError',
  component: InputGroupError,
  argTypes: {
    error: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
    errorMessage: {
      table: {
        defaultValue: {
          summary: ''
        }
      }
    },
    children: {
      table: {
        defaultValue: {
          summary: 'ReactNode'
        }
      },
      control: {
        type: null
      }
    },
  }
}

const Template = (args) => {
  const { children, ...rest } = args
  return (
    <InputGroupError {...rest}>
      {children}
    </InputGroupError>
  )
}

/* ===== Text Field ===== */
const textField = <TextField label="Enter your name" variant="outlined" />

const InputGroupErrorText = Template.bind({})
InputGroupErrorText.storyName = "Text Input"
InputGroupErrorText.args = {
  error: false,
  errorMessage: 'Please fill in the input',
  children: textField
}

/* ===== Toggle Button ===== */
const toggleBtn = <ToggleButtonGroup exclusive>
  <ToggleButton value="Yes">Yes</ToggleButton>
  <ToggleButton value="No">No</ToggleButton>
</ToggleButtonGroup>

const InputGroupErrorToggleBtn = Template.bind({})
InputGroupErrorToggleBtn.storyName = "Toggle Button"
InputGroupErrorToggleBtn.args = {
  error: true,
  errorMessage: 'Please select an option',
  children: toggleBtn
}

/* ===== Radio Buttons ===== */
const radioField = <RadioGroup name="changeOption">
  <FormControlLabel value="close" control={<Radio color="primary" />} label="Close your online account" />
  <FormControlLabel value="leave" control={<Radio color="primary" />} label="Leave the Biobank" />
</RadioGroup>

const InputGroupErrorRadio = Template.bind({})
InputGroupErrorRadio.storyName = "Radio Group"
InputGroupErrorRadio.args = {
  error: true,
  errorMessage: 'Please select an option',
  children: radioField
}

/* ===== Textarea Field ===== */
const textarea = <FormControl component="fieldset" style={{width:'100%'}}>
  <TextField
    label="Reason for leaving"
    multiline
    rows="6"
    margin="normal"
    variant="outlined"
    helperText="1000 character limit"
    inputProps={{
      maxLength: 1000,
    }}
  />
</FormControl>

const InputGroupErrorTextarea = Template.bind({})
InputGroupErrorTextarea.storyName = "Textarea"
InputGroupErrorTextarea.args = {
  error: true,
  errorMessage: 'You must supply a reason for leaving',
  children: textarea
}

/* ===== Multiple Inputs ===== */
const Address = () => {
  const classes = useStyles()
  return (
    <FormControl component="fieldset" className={classes.root}>
      <div>
        <TextField label="First name" />
        <TextField label="Last name" />
      </div>
      <div>
        <TextField label="Street" />
      </div>
      <div>
        <TextField label="City" />
        <TextField label="State" />
        <TextField label="Zip code" />
      </div>
    </FormControl>
  )
}

const InputGroupErrorAddress = Template.bind({})
InputGroupErrorAddress.storyName = "Multiple Inputs"
InputGroupErrorAddress.args = {
  error: true,
  errorMessage: 'Please complete the address form',
  children: <Address />
}


export { InputGroupErrorText, InputGroupErrorToggleBtn, InputGroupErrorRadio, InputGroupErrorTextarea, InputGroupErrorAddress }