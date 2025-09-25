import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DialogProvider } from "./DialogProvider.tsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { blue, grey, red, green } from "@mui/material/colors";

const customTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[600],
          contrastText: "#fff",
        },
        secondary: {
          main: grey[800],
        },
        error: {
          main: red.A400,
        },
        success: {
          main: green[500],
        },
        background: {
          default: "#f7f9fc",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[400],
          contrastText: "#000",
        },
        secondary: {
          main: grey[300],
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DialogProvider>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </DialogProvider>
  </StrictMode>
);
