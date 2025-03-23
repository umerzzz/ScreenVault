import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchlistDetail from "./pages/WatchlistDetail";
import AddWatchlistItem from "./pages/AddWatchlistItem";
import EditWatchlistItem from "./pages/EditWatchlistItem";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");

  // Apply dark-mode class to body
  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
            contrastText: mode === "dark" ? "#121212" : "#ffffff",
          },
          secondary: {
            main: mode === "dark" ? "#f48fb1" : "#e91e63",
            contrastText: mode === "dark" ? "#121212" : "#ffffff",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#f5f5f5" : "#121212",
            secondary: mode === "dark" ? "#b0b0b0" : "#666666",
          },
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow:
                  mode === "dark"
                    ? "0 8px 16px rgba(0,0,0,0.4)"
                    : "0 8px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    mode === "dark"
                      ? "0 12px 20px rgba(0,0,0,0.5)"
                      : "0 12px 20px rgba(0,0,0,0.15)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: "transform 0.2s ease, background-color 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: theme.palette.background.default,
          }}
        >
          <Navbar toggleTheme={toggleTheme} mode={mode} />
          <Container
            sx={{
              mt: 4,
              mb: 4,
              pt: 2,
              pb: 2,
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddWatchlistItem />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/item/:id" element={<WatchlistDetail />} />
              <Route path="/edit/:id" element={<EditWatchlistItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
