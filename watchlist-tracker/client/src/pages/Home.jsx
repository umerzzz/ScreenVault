import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Fade,
  Grow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import WatchlistItem from "../components/WatchlistItem";
import { getWatchlistItems, deleteWatchlistItem } from "../services/api";
import { motion } from "framer-motion";

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "plan_to_watch", label: "Plan to Watch" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
  { value: "anime", label: "Anime" },
  { value: "other", label: "Other" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title_asc", label: "Title (A-Z)" },
  { value: "title_desc", label: "Title (Z-A)" },
  { value: "rating_high", label: "Rating (High to Low)" },
  { value: "rating_low", label: "Rating (Low to High)" },
];

const Home = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchWatchlistItems = async () => {
    try {
      setLoading(true);
      const data = await getWatchlistItems();
      setWatchlistItems(data);
      setFilteredItems(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch watchlist items. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlistItems();
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...watchlistItems];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.genre &&
            item.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.notes &&
            item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }

    // Sort items
    result = sortItems(result, sortBy);

    setFilteredItems(result);
  }, [watchlistItems, searchTerm, statusFilter, typeFilter, sortBy]);

  const sortItems = (items, sortOption) => {
    switch (sortOption) {
      case "newest":
        return [...items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return [...items].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "title_asc":
        return [...items].sort((a, b) => a.title.localeCompare(b.title));
      case "title_desc":
        return [...items].sort((a, b) => b.title.localeCompare(a.title));
      case "rating_high":
        return [...items].sort((a, b) => b.rating - a.rating);
      case "rating_low":
        return [...items].sort((a, b) => a.rating - b.rating);
      default:
        return items;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteWatchlistItem(id);
        setWatchlistItems(watchlistItems.filter((item) => item._id !== id));
      } catch (err) {
        setError("Failed to delete the item. Please try again.");
        console.error(err);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSortBy("newest");
  };

  const handleBookmarkToggle = (updatedItem) => {
    setWatchlistItems(
      watchlistItems.map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      )
    );
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

  return (
    <Box>
      <Fade in={true} timeout={800}>
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: { xs: "center", md: "left" },
              mb: 4,
            }}
          >
            My Watchlist
          </Typography>

          {/* Search and filter bar */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 4,
              borderRadius: 2,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 30, 0.7)"
                  : "rgba(255, 255, 255, 0.85)",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Search by title, genre, or notes"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    label="Type"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {typeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <InputAdornment position="start">
                        <SortIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    label="Clear All Filters"
                    onClick={clearFilters}
                    variant="outlined"
                    sx={{ cursor: "pointer" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {watchlistItems.length === 0 ? (
            <Grow in={true} timeout={800}>
              <Paper
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 3,
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
                <Typography variant="h5" gutterBottom>
                  Your watchlist is empty
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Add some movies, TV shows, or anime to your watchlist to get
                  started!
                </Typography>
              </Paper>
            </Grow>
          ) : filteredItems.length === 0 ? (
            <Grow in={true} timeout={800}>
              <Paper
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 3,
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
                <Typography variant="h5" gutterBottom>
                  No items match your filters
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Try adjusting your search criteria or clear the filters.
                </Typography>
                <Chip
                  label="Clear All Filters"
                  onClick={clearFilters}
                  color="primary"
                  sx={{ cursor: "pointer" }}
                />
              </Paper>
            </Grow>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Showing {filteredItems.length} of {watchlistItems.length}{" "}
                  items
                </Typography>
              </Box>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <Grid container spacing={3}>
                  {filteredItems.map((item) => (
                    <Grid
                      item
                      key={item._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      component={motion.div}
                      variants={{
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
                      }}
                    >
                      <WatchlistItem
                        item={item}
                        onDeleteClick={handleDelete}
                        onBookmarkToggle={handleBookmarkToggle}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default Home;
