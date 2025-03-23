import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  Alert,
  CircularProgress,
  Fade,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import WatchlistItem from "../components/WatchlistItem";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getBookmarkedItems, deleteWatchlistItem } from "../services/api";

const Bookmarks = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      try {
        setLoading(true);
        const data = await getBookmarkedItems();
        setBookmarkedItems(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch bookmarked items. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedItems();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await deleteWatchlistItem(id);
      setBookmarkedItems(bookmarkedItems.filter((item) => item._id !== id));
    } catch (err) {
      setError("Failed to delete item. Please try again.");
      console.error(err);
    }
  };

  const handleBookmarkToggle = (updatedItem) => {
    if (!updatedItem.bookmarked) {
      // Remove from the bookmarked list if unbookmarked
      setBookmarkedItems(
        bookmarkedItems.filter((item) => item._id !== updatedItem._id)
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            color: "transparent",
            WebkitBackgroundClip: "text",
            display: "inline-block",
          }}
        >
          My Bookmarks
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: "600px", mx: "auto" }}
        >
          Quick access to your favorite and important watchlist items
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : bookmarkedItems.length === 0 ? (
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
              maxWidth: "600px",
              mx: "auto",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right bottom, #1f1f1f, #2d2d2d)"
                  : "linear-gradient(to right bottom, #f8f9fa, #e9ecef)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <BookmarkBorderIcon
              sx={{
                fontSize: 80,
                mb: 2,
                color: theme.palette.text.secondary,
                opacity: 0.6,
              }}
            />
            <Typography variant="h5" gutterBottom>
              No bookmarked items yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Bookmark your favorite items to quickly access them here
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
              sx={{
                px: 3,
                py: 1,
                borderRadius: "20px",
                boxShadow:
                  "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Browse Items
            </Button>
          </Paper>
        </Fade>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {bookmarkedItems.map((item) => (
              <Grid
                item
                key={item._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                component={motion.div}
                variants={itemVariants}
              >
                <WatchlistItem
                  item={item}
                  onDeleteClick={() => handleDeleteClick(item._id)}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </Container>
  );
};

export default Bookmarks;
