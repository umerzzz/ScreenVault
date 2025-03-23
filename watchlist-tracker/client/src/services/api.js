import axios from "axios";

const API_URL = "/api/watchlist";

// Get all watchlist items
export const getWatchlistItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist items:", error);
    throw error;
  }
};

// Get all bookmarked watchlist items
export const getBookmarkedItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookmarks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarked items:", error);
    throw error;
  }
};

// Get watchlist item by ID
export const getWatchlistItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching watchlist item ${id}:`, error);
    throw error;
  }
};

// Add new watchlist item
export const addWatchlistItem = async (watchlistItem) => {
  try {
    const response = await axios.post(API_URL, watchlistItem);
    return response.data;
  } catch (error) {
    console.error("Error adding watchlist item:", error);
    throw error;
  }
};

// Update watchlist item
export const updateWatchlistItem = async (id, watchlistItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, watchlistItem);
    return response.data;
  } catch (error) {
    console.error(`Error updating watchlist item ${id}:`, error);
    throw error;
  }
};

// Toggle bookmark status
export const toggleBookmark = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/bookmark`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling bookmark for item ${id}:`, error);
    throw error;
  }
};

// Delete watchlist item
export const deleteWatchlistItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting watchlist item ${id}:`, error);
    throw error;
  }
};
