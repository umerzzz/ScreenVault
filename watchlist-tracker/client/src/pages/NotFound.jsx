import { Link as RouterLink } from "react-router-dom";
import { Typography, Box, Button, Paper, Fade, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            borderRadius: 4,
            position: "relative",
            overflow: "hidden",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(30, 30, 30, 0.7)"
                : "rgba(255, 255, 255, 0.85)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                : "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100px",
              height: "100px",
              backgroundColor: theme.palette.error.main,
              transform: "rotate(45deg) translate(30%, -70%)",
              opacity: 0.1,
              borderRadius: "0 0 0 100%",
            }}
          />

          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: theme.palette.error.main,
              mb: 2,
            }}
          />

          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              fontWeight: 700,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #f48fb1 30%, #90caf9 90%)"
                  : "linear-gradient(45deg, #e91e63 30%, #2196f3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Page Not Found
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: "80%" }}>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to="/"
            startIcon={<HomeIcon />}
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 8,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 3px 5px 2px rgba(144, 202, 249, .15)"
                  : "0 3px 5px 2px rgba(25, 118, 210, .15)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 10px 4px rgba(144, 202, 249, .2)"
                    : "0 6px 10px 4px rgba(25, 118, 210, .2)",
              },
            }}
          >
            Back to Home
          </Button>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100px",
              height: "100px",
              backgroundColor: theme.palette.primary.main,
              transform: "rotate(45deg) translate(-30%, 70%)",
              opacity: 0.1,
              borderRadius: "0 100% 0 0",
            }}
          />
        </Paper>
      </Box>
    </Fade>
  );
};

export default NotFound;
