const express = require("express");
const router = express.Router();
const WatchlistItem = require("../models/Watchlist");

// @route   GET api/watchlist
// @desc    Get all watchlist items
// @access  Public
router.get("/", async (req, res) => {
  try {
    const watchlistItems = await WatchlistItem.find().sort({ createdAt: -1 });
    res.json(watchlistItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/watchlist/bookmarks
// @desc    Get all bookmarked watchlist items
// @access  Public
router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarkedItems = await WatchlistItem.find({ bookmarked: true }).sort(
      { createdAt: -1 }
    );
    res.json(bookmarkedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/watchlist/:id
// @desc    Get watchlist item by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const watchlistItem = await WatchlistItem.findById(req.params.id);

    if (!watchlistItem) {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }

    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/watchlist
// @desc    Add a watchlist item
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newWatchlistItem = new WatchlistItem({
      title: req.body.title,
      type: req.body.type,
      genre: req.body.genre,
      status: req.body.status,
      rating: req.body.rating,
      notes: req.body.notes,
      imageUrl: req.body.imageUrl,
      releaseYear: req.body.releaseYear,
      bookmarked: req.body.bookmarked || false,
    });

    const watchlistItem = await newWatchlistItem.save();
    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/watchlist/:id
// @desc    Update a watchlist item
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      type,
      genre,
      status,
      rating,
      notes,
      imageUrl,
      releaseYear,
      bookmarked,
    } = req.body;

    // Build watchlist item object
    const watchlistFields = {};
    if (title) watchlistFields.title = title;
    if (type) watchlistFields.type = type;
    if (genre) watchlistFields.genre = genre;
    if (status) watchlistFields.status = status;
    if (rating !== undefined) watchlistFields.rating = rating;
    if (notes) watchlistFields.notes = notes;
    if (imageUrl) watchlistFields.imageUrl = imageUrl;
    if (releaseYear) watchlistFields.releaseYear = releaseYear;
    if (bookmarked !== undefined) watchlistFields.bookmarked = bookmarked;

    let watchlistItem = await WatchlistItem.findById(req.params.id);

    if (!watchlistItem) {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }

    watchlistItem = await WatchlistItem.findByIdAndUpdate(
      req.params.id,
      { $set: watchlistFields },
      { new: true }
    );

    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/watchlist/:id/bookmark
// @desc    Toggle bookmark status of a watchlist item
// @access  Public
router.put("/:id/bookmark", async (req, res) => {
  try {
    let watchlistItem = await WatchlistItem.findById(req.params.id);

    if (!watchlistItem) {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }

    // Toggle the bookmark status
    watchlistItem = await WatchlistItem.findByIdAndUpdate(
      req.params.id,
      { $set: { bookmarked: !watchlistItem.bookmarked } },
      { new: true }
    );

    res.json(watchlistItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/watchlist/:id
// @desc    Delete a watchlist item
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const watchlistItem = await WatchlistItem.findById(req.params.id);

    if (!watchlistItem) {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }

    await WatchlistItem.findByIdAndDelete(req.params.id);

    res.json({ msg: "Watchlist item removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Watchlist item not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
