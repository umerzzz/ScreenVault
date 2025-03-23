import {
  Box,
  Typography,
  Container,
  Link,
  IconButton,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
        borderTop: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.main}30, transparent 70%)`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.secondary.main}30, transparent 70%)`,
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MovieFilterIcon
              color="primary"
              sx={{
                fontSize: 24,
                animation: "pulse 2s infinite ease-in-out",
                "@keyframes pulse": {
                  "0%": { opacity: 0.6 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.6 },
                },
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
              }}
            >
              © {new Date().getFullYear()} Watchlist Tracker
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
              Made with
            </Typography>
            <FavoriteIcon
              color="error"
              fontSize="small"
              sx={{
                animation: "heartBeat 1.5s infinite ease-in-out",
                "@keyframes heartBeat": {
                  "0%": { transform: "scale(1)" },
                  "14%": { transform: "scale(1.3)" },
                  "28%": { transform: "scale(1)" },
                  "42%": { transform: "scale(1.3)" },
                  "70%": { transform: "scale(1)" },
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>
              using MERN Stack
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="GitHub">
              <IconButton
                size="small"
                component="a"
                href="https://github.com/umerzzz"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#333",
                  "&:hover": {
                    color: "#6e5494",
                    backgroundColor: "rgba(110, 84, 148, 0.1)",
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="LinkedIn">
              <IconButton
                size="small"
                component="a"
                href="https://www.linkedin.com/in/muhammad-umer-farooq-6961b4358/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#333",
                  "&:hover": {
                    color: "#0077B5",
                    backgroundColor: "rgba(0, 119, 181, 0.1)",
                  },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
