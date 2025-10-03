// MUI
import { TextField } from "@mui/material";

export default function AppTextField({ errorText, ...props }) {
  return (
    <TextField
      fullWidth
      margin="normal"
      error={!!errorText}
      helperText={errorText}
      {...props}
    />
  );
}
