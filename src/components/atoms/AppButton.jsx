// MUI
import { Button } from "@mui/material";

export default function AppButton({ children, ...props }) {
  return <Button variant="contained" size="large" {...props}>{children}</Button>;
}
