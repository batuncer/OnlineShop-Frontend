// MUI
import { TextField } from '@mui/material';

const AppTextField = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  type = 'text',
  error = false,
  helperText,
  placeholder,
  disabled = false,
  required = false,
  multiline = false,
  rows = 1,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  inputProps = {},
  InputProps = {},
  sx = {},
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      type={type}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      inputProps={inputProps}
      InputProps={InputProps}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'white',
          '&:hover fieldset': {
            borderColor: '#8B4513',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#8B4513',
            borderWidth: 2,
          },
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#8B4513',
          },
        },
        '& .MuiFormHelperText-root': {
          fontWeight: 500,
        },
        ...sx
      }}
      {...props}
    />
  );
};

export default AppTextField;