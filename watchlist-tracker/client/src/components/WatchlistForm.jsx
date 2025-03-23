import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Rating,
  Paper,
  Grid,
  Divider,
  Chip,
  Fade,
  Zoom,
  InputAdornment,
  useTheme,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import VideocamIcon from "@mui/icons-material/Videocam";
import DevicesIcon from "@mui/icons-material/Devices";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ImageIcon from "@mui/icons-material/Image";
import TitleIcon from "@mui/icons-material/Title";
import EventIcon from "@mui/icons-material/Event";
import CategoryIcon from "@mui/icons-material/Category";

const types = [
  { value: "movie", label: "Movie", icon: <MovieIcon fontSize="small" /> },
  { value: "tv", label: "TV Show", icon: <TvIcon fontSize="small" /> },
  { value: "anime", label: "Anime", icon: <VideocamIcon fontSize="small" /> },
  { value: "other", label: "Other", icon: <DevicesIcon fontSize="small" /> },
];

const statuses = [
  { value: "plan_to_watch", label: "Plan to Watch" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
];

const statusColors = {
  plan_to_watch: "info",
  watching: "primary",
  completed: "success",
  on_hold: "warning",
  dropped: "error",
};

const initialState = {
  title: "",
  type: "movie",
  genre: "",
  status: "plan_to_watch",
  rating: 0,
  notes: "",
  imageUrl: "",
  releaseYear: "",
};

const WatchlistForm = ({ initialData = null, onSubmit, title }) => {
  const [formData, setFormData] = useState(initialData || initialState);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Mark field as touched
    if (!touched[name]) {
      setTouched({ ...touched, [name]: true });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }

    // Handle image URL preview
    if (name === "imageUrl" && value) {
      setImagePreview(value);
    }
  };

  const handleRatingChange = (e, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title is required";
        }
        break;
      case "releaseYear":
        if (
          value &&
          (isNaN(value) || value < 1800 || value > new Date().getFullYear() + 5)
        ) {
          error = "Please enter a valid year";
        }
        break;
      case "imageUrl":
        if (value && !isValidUrl(value)) {
          error = "Please enter a valid URL";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateForm = () => {
    const fieldsToValidate = {
      title: formData.title,
      releaseYear: formData.releaseYear,
      imageUrl: formData.imageUrl,
    };

    const newErrors = {};
    let isValid = true;

    Object.entries(fieldsToValidate).forEach(([name, value]) => {
      if (!validateField(name, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (validateForm()) {
      // Convert releaseYear to number if it's not empty
      const submittedData = {
        ...formData,
        releaseYear: formData.releaseYear
          ? parseInt(formData.releaseYear, 10)
          : undefined,
      };

      onSubmit(submittedData);
    }
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: "80px",
              height: "4px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2px",
            },
          }}
        >
          {title}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {/* Left Column */}
              <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      label="Type"
                      onChange={handleChange}
                    >
                      {types.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {type.icon}
                            <Box sx={{ ml: 1 }}>{type.label}</Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Genre */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CategoryIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      label="Status"
                      onChange={handleChange}
                      renderValue={(selected) => (
                        <Chip
                          label={
                            statuses.find((s) => s.value === selected)?.label
                          }
                          size="small"
                          color={statusColors[selected]}
                        />
                      )}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          <Chip
                            label={status.label}
                            size="small"
                            color={statusColors[status.value]}
                            sx={{ mr: 1 }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Release Year */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Release Year"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.releaseYear && !!errors.releaseYear}
                    helperText={touched.releaseYear && errors.releaseYear}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Rating */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: { xs: 1, sm: 2 },
                      p: 2,
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <Typography component="legend" sx={{ fontWeight: 600 }}>
                      Rating
                    </Typography>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      max={10}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      icon={<StarIcon fontSize="inherit" />}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        ml: { xs: 0, sm: 1 },
                        fontWeight: 600,
                        color:
                          formData.rating > 0
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {formData.rating}/10
                    </Typography>
                  </Box>
                </Grid>

                {/* Notes */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column - Image */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.imageUrl && !!errors.imageUrl}
                  helperText={touched.imageUrl && errors.imageUrl}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Zoom in={true} timeout={500}>
                  <Paper
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexGrow: 1,
                      minHeight: "240px",
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(0, 0, 0, 0.2)"
                          : "rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          maxHeight: "300px",
                        }}
                        onError={() => setImagePreview("")}
                      />
                    ) : (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 60, opacity: 0.5, mb: 1 }} />
                        <Typography>Image Preview</Typography>
                        <Typography variant="caption">
                          Enter a valid image URL to see a preview
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Zoom>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/")}
                  startIcon={<CancelIcon />}
                  sx={{
                    borderRadius: 8,
                    px: 3,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{
                    borderRadius: 8,
                    px: 3,
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
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Fade>
  );
};

export default WatchlistForm;
