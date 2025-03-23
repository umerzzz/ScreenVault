import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  Zoom,
  Fade,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Navbar = ({ toggleTheme, mode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const location = useLocation();

  // Detect scroll for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? scrolled
              ? "rgba(18, 18, 18, 0.95)"
              : "rgba(18, 18, 18, 0.8)"
            : scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Zoom in={true} style={{ transitionDelay: "100ms" }}>
            <MovieIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: theme.palette.primary.main,
                animation: "pulse 2s infinite ease-in-out",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          </Zoom>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: theme.palette.text.primary,
              textDecoration: "none",
              position: "relative",
              "&:after": isActive("/")
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "8px",
                  }
                : {},
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)"
                    : "linear-gradient(45deg, #1976d2 30%, #e91e63 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textFillColor: "transparent",
              },
              transition: "all 0.3s ease",
            }}
          >
            Watchlist Tracker
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 16px rgba(0,0,0,0.4)"
                      : "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 200 }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to="/"
                selected={isActive("/")}
                sx={{
                  borderLeft: isActive("/")
                    ? `4px solid ${theme.palette.primary.main}`
                    : "4px solid transparent",
                }}
              >
                <HomeIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to="/add"
                selected={isActive("/add")}
                sx={{
                  borderLeft: isActive("/add")
                    ? `4px solid ${theme.palette.secondary.main}`
                    : "4px solid transparent",
                }}
              >
                <AddIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography textAlign="center">Add Item</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <MovieIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            Watchlist
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                my: 2,
                color: theme.palette.text.primary,
                display: "flex",
                mx: 1,
                position: "relative",
                "&:after": isActive("/")
                  ? {
                      content: '""',
                      position: "absolute",
                      bottom: 5,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "50%",
                      height: "3px",
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "8px",
                    }
                  : {},
                ":hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Home
            </Button>

            <Button
              component={RouterLink}
              to="/bookmarks"
              startIcon={<BookmarkBorderIcon />}
              sx={{
                my: 2,
                color: theme.palette.text.primary,
                display: "flex",
                mx: 1,
                ":hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Bookmarks
            </Button>
          </Box>

          {/* Right section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Theme toggle */}
            <Tooltip
              title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            >
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                  mr: 2,
                  color: theme.palette.text.primary,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {mode === "dark" ? (
                  <Brightness7Icon sx={{ color: "orange" }} />
                ) : (
                  <Brightness4Icon sx={{ color: "#6A1B9A" }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Add button */}
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <Button
                component={RouterLink}
                to="/add"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                sx={{
                  px: 2,
                  py: 1,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 3px 5px 2px rgba(244, 143, 177, .15)"
                      : "0 3px 5px 2px rgba(233, 30, 99, .15)",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(45deg, #f48fb1 30%, #90caf9 90%)"
                      : "linear-gradient(45deg, #e91e63 30%, #1976d2 90%)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 6px 10px 4px rgba(244, 143, 177, .2)"
                        : "0 6px 10px 4px rgba(233, 30, 99, .2)",
                  },
                }}
              >
                Add to Watchlist
              </Button>
            </Zoom>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
