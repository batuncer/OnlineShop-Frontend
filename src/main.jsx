import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

// Store
import { store } from "./app/store";

// MUI Theme
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./design/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
