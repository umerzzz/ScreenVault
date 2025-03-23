import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Fade,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";
import BookIcon from "@mui/icons-material/Book";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { toggleBookmark } from "../services/api";

// Use online placeholder image
const placeholderImage =
  "https://placehold.co/200x300/gray/white?text=No+Image";

const typeIcons = {
  movie: <LocalMoviesIcon fontSize="small" />,
  tv: <TvIcon fontSize="small" />,
  anime: <VideogameAssetIcon fontSize="small" />,
  other: <BookIcon fontSize="small" />,
};

const statusIcons = {
  watching: <AccessTimeIcon fontSize="small" />,
  completed: <CheckCircleIcon fontSize="small" color="success" />,
  plan_to_watch: <WatchLaterIcon fontSize="small" color="info" />,
  dropped: <CancelIcon fontSize="small" color="error" />,
  on_hold: <WatchLaterIcon fontSize="small" color="warning" />,
};

// Status colors
const statusColors = {
  watching: "#ff9800",
  completed: "#4caf50",
  plan_to_watch: "#2196f3",
  dropped: "#f44336",
  on_hold: "#ff9800",
};

const WatchlistItem = ({ item, onDeleteClick, onBookmarkToggle }) => {
  const [elevation, setElevation] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarked, setBookmarked] = useState(item.bookmarked || false);
  const theme = useTheme();

  const handleMouseEnter = () => {
    setElevation(8);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setElevation(3);
    setIsHovered(false);
  };

  // Truncate notes if longer than 80 characters
  const truncateNotes = (notes) => {
    if (!notes) return "";
    return notes.length > 80 ? `${notes.substring(0, 80)}...` : notes;
  };

  const handleBookmarkToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updatedItem = await toggleBookmark(item._id);
      setBookmarked(updatedItem.bookmarked);
      if (onBookmarkToggle) {
        onBookmarkToggle(updatedItem);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const statusLabel = {
    plan_to_watch: "Plan to Watch",
    watching: "Watching",
    completed: "Completed",
    on_hold: "On Hold",
    dropped: "Dropped",
  };

  const typeLabel = {
    movie: "Movie",
    tv: "TV Show",
    anime: "Anime",
    other: "Other",
  };

  return (
    <Fade in={true} timeout={500}>
      <Card
        elevation={elevation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          width: "100%",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          },
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 16px rgba(0,0,0,0.4)"
              : "0 8px 16px rgba(0,0,0,0.1)",
        }}
        className="hover-lift"
      >
        <Box
          sx={{
            height: 200,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={item.imageUrl || placeholderImage}
            alt={item.title}
            sx={{
              objectFit: "cover",
              width: "100%",
              transition: "transform 0.5s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              gap: 0.5,
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Chip
              icon={typeIcons[item.type]}
              label={typeLabel[item.type] || item.type}
              size="small"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(18, 18, 18, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(4px)",
                fontWeight: 600,
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                mb: 1,
              }}
            />
            <Chip
              icon={statusIcons[item.status]}
              label={statusLabel[item.status] || item.status}
              size="small"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(18, 18, 18, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(4px)",
                fontWeight: 600,
                color: statusColors[item.status],
                border: `1px solid ${statusColors[item.status]}`,
              }}
            />
          </Box>
          {item.releaseYear && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                bgcolor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              {item.releaseYear}
            </Typography>
          )}
          <Box sx={{ position: "absolute", top: 10, left: 10 }}>
            <Tooltip
              title={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <IconButton
                onClick={handleBookmarkToggle}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: bookmarked ? theme.palette.secondary.main : "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                }}
                size="small"
              >
                {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: "1.1rem",
              height: "2.75rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              transition: "color 0.3s ease",
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {item.title}
          </Typography>

          {item.genre && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mr: 1,
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Genre:
              </Typography>
              <Chip
                label={item.genre}
                size="small"
                sx={{
                  height: "auto",
                  fontSize: "0.75rem",
                  py: 0.25,
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(144, 202, 249, 0.15)"
                      : "rgba(25, 118, 210, 0.1)",
                  border: `1px solid ${theme.palette.primary.main}30`,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                }}
              />
            </Box>
          )}

          {item.rating > 0 && (
            <Box sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
                sx={{ mr: 1 }}
              >
                Rating:
              </Typography>
              <Rating
                value={item.rating}
                readOnly
                size="small"
                precision={0.5}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiRating-iconEmpty": {
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.2)",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5,
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                }}
              >
                {item.rating.toFixed(1)}
              </Typography>
            </Box>
          )}

          {item.notes && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Notes:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.85rem",
                  color: theme.palette.text.secondary,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}
              >
                {truncateNotes(item.notes)}
              </Typography>
            </Box>
          )}
        </CardContent>

        <Divider sx={{ opacity: 0.6 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <Tooltip title="View details">
            <IconButton
              component={Link}
              to={`/item/${item._id}`}
              size="small"
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(144, 202, 249, 0.1)"
                      : "rgba(25, 118, 210, 0.08)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Edit">
              <IconButton
                component={Link}
                to={`/edit/${item._id}`}
                size="small"
                sx={{
                  color: theme.palette.warning.main,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 167, 38, 0.1)"
                        : "rgba(255, 152, 0, 0.08)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                onClick={() =>
                  onDeleteClick && typeof onDeleteClick === "function"
                    ? onDeleteClick(item._id)
                    : console.warn("onDeleteClick is not a function")
                }
                size="small"
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(244, 67, 54, 0.1)"
                        : "rgba(244, 67, 54, 0.08)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Fade>
  );
};

export default WatchlistItem;
