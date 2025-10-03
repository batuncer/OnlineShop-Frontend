import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1e88e5" },
    secondary: { main: "#8e24aa" },
    error: { main: "#e53935" },
    background: { default: "#fafafa" },
  },
  shape: { borderRadius: 10 },
  spacing: 8,
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h4: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});
