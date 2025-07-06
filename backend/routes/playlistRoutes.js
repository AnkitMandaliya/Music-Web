const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlistController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig"); // ✅ Make sure this file exists

// ✅ Routes
router.post("/songs", protect, upload.single("file"), playlistController.addSong);
router.get("/songs", protect, playlistController.getSongs);
router.delete("/songs/:id", protect, playlistController.deleteSong);

module.exports = router;
