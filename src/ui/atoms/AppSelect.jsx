// MUI
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

const AppSelect = ({
  label,
  value,
  onChange,
  name,
  options = [],
  error = false,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  placeholder,
  sx = {},
  ...props
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled} sx={sx}>
      <InputLabel required={required}>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
        }}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AppSelect;