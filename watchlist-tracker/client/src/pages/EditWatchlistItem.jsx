import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, CircularProgress, Box } from "@mui/material";
import WatchlistForm from "../components/WatchlistForm";
import { getWatchlistItemById, updateWatchlistItem } from "../services/api";

const EditWatchlistItem = () => {
  const [watchlistItem, setWatchlistItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleSubmit = async (formData) => {
    try {
      await updateWatchlistItem(id, formData);
      navigate("/");
    } catch (err) {
      setError("Failed to update watchlist item. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
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
    <WatchlistForm
      initialData={watchlistItem}
      onSubmit={handleSubmit}
      title={`Edit: ${watchlistItem?.title}`}
    />
  );
};

export default EditWatchlistItem;
