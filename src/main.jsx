import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

// Store
import { persistor, store } from "./app/store";

// MUI Theme
import { ThemeProvider, CssBaseline } from "@mui/material";

// Custom Theme
import { theme } from "./theme/theme";

// Redux Persist
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
