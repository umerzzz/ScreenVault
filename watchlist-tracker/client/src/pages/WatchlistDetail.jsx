import { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Rating,
  Button,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  getWatchlistItemById,
  deleteWatchlistItem,
  toggleBookmark,
} from "../services/api";

const statusLabels = {
  plan_to_watch: "Plan to Watch",
  watching: "Watching",
  completed: "Completed",
  on_hold: "On Hold",
  dropped: "Dropped",
};

const statusColors = {
  plan_to_watch: "info",
  watching: "primary",
  completed: "success",
  on_hold: "warning",
  dropped: "error",
};

const WatchlistDetail = () => {
  const [watchlistItem, setWatchlistItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchWatchlistItem = async () => {
      try {
        setLoading(true);
        const data = await getWatchlistItemById(id);
        setWatchlistItem(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch watchlist item. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteWatchlistItem(id);
        navigate("/");
      } catch (err) {
        setError("Failed to delete the item. Please try again.");
        console.error(err);
      }
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      const updatedItem = await toggleBookmark(id);
      setWatchlistItem(updatedItem);
    } catch (err) {
      setError("Failed to update bookmark status. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!watchlistItem) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Watchlist item not found.
      </Alert>
    );
  }

  const {
    title,
    type,
    genre,
    status,
    rating,
    notes,
    imageUrl,
    releaseYear,
    createdAt,
  } = watchlistItem;

  const defaultImage = "https://via.placeholder.com/300x450?text=No+Image";
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 3,
              fontWeight: 600,
              "&:hover": {
                transform: "translateX(-4px)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            Back to Watchlist
          </Button>

          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.7)"
                  : "rgba(255, 255, 255, 0.85)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container>
              {/* Left side - Image */}
              <Grid item xs={12} md={4} sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: "300px", md: "100%" },
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={imageUrl || defaultImage}
                    alt={title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      p: 2,
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      {title}
                    </Typography>
                    {releaseYear && (
                      <Typography variant="body1" sx={{ color: "white" }}>
                        {releaseYear}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Right side - Content */}
              <Grid item xs={12} md={8}>
                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Title and year */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {title} {releaseYear && `(${releaseYear})`}
                    </Typography>
                  </Box>

                  {/* Tags */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 3,
                      mt: { xs: 3, md: 1 },
                    }}
                  >
                    <Chip
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                      sx={{
                        fontWeight: 500,
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(144, 202, 249, 0.2)"
                            : "rgba(25, 118, 210, 0.1)",
                        color: theme.palette.primary.main,
                      }}
                    />

                    {genre && (
                      <Chip
                        label={genre}
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    )}

                    <Chip
                      label={statusLabels[status]}
                      color={statusColors[status]}
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />

                    {releaseYear && (
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={releaseYear}
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mr: 2, fontWeight: 600 }}
                    >
                      Rating:
                    </Typography>
                    <Rating
                      value={rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      icon={<StarIcon fontSize="inherit" />}
                    />
                    <Typography variant="body1" sx={{ ml: 1, fontWeight: 600 }}>
                      {rating}/10
                    </Typography>
                  </Box>

                  {/* Notes */}
                  {notes && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        <NoteIcon fontSize="small" /> Notes
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(0, 0, 0, 0.2)"
                              : "rgba(0, 0, 0, 0.02)",
                        }}
                      >
                        <Typography variant="body1">{notes}</Typography>
                      </Paper>
                    </Box>
                  )}

                  <Divider sx={{ my: 3 }} />

                  {/* Date added */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Added on: {formattedDate}
                  </Typography>

                  {/* Action buttons */}
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      component={RouterLink}
                      to={`/edit/${id}`}
                      sx={{
                        px: 3,
                        py: 1,
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
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 8,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 3px 5px 2px rgba(244, 67, 54, .15)",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Fade>
      {watchlistItem && (
        <Fade in={true} timeout={500}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right bottom, #1f1f1f, #2d2d2d)"
                  : "linear-gradient(to right bottom, #f8f9fa, #e9ecef)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Back button */}
            <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 1 }}>
              <Tooltip title="Back to watchlist">
                <IconButton
                  component={RouterLink}
                  to="/"
                  aria-label="back"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Action buttons */}
            <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
              <Tooltip title="Bookmark">
                <IconButton
                  onClick={handleBookmarkToggle}
                  sx={{
                    mr: 1,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                    color: watchlistItem.bookmarked
                      ? theme.palette.secondary.main
                      : "inherit",
                  }}
                >
                  {watchlistItem.bookmarked ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  component={RouterLink}
                  to={`/edit/${watchlistItem._id}`}
                  sx={{
                    mr: 1,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={handleDelete}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        </Fade>
      )}
    </Container>
  );
};

export default WatchlistDetail;
