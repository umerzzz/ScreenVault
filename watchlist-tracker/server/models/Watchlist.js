const mongoose = require("mongoose");

const WatchlistItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["movie", "tv", "anime", "other"],
    default: "movie",
  },
  genre: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["plan_to_watch", "watching", "completed", "on_hold", "dropped"],
    default: "plan_to_watch",
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  notes: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  releaseYear: {
    type: Number,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WatchlistItem", WatchlistItemSchema);
