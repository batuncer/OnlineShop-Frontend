//MUI
import { Box } from '@mui/material';

// Atom
import AppTextField from '../atoms/AppTextField';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  register, 
  errors, 
  placeholder,
  ...props 
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <AppTextField
        fullWidth
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...register(name)}
        {...props}
      />
    </Box>
  );
};

export default FormField;
