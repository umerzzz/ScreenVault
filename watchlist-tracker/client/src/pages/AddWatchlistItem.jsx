import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import WatchlistForm from "../components/WatchlistForm";
import { addWatchlistItem } from "../services/api";

const AddWatchlistItem = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await addWatchlistItem(formData);
      navigate("/");
    } catch (err) {
      setError("Failed to add watchlist item. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <WatchlistForm onSubmit={handleSubmit} title="Add to Watchlist" />
    </>
  );
};

export default AddWatchlistItem;
