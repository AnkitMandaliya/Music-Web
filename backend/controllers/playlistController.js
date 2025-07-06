const Song = require("../models/Song");
const path = require("path");


// ✅ Add song (URL or file)
exports.addSong = async (req, res) => {
  try {
    const userId = req.user.id;

    // File upload
    if (req.file) {
      const { title, artist, genre } = req.body;

      if (!title || !artist) {
        return res.status(400).json({ message: "Title and artist are required" });
      }

      console.log("Received title:", title);
      console.log("Received artist:", artist);
      console.log("File uploaded:", req.file.filename);

      const song = new Song({
        userId,
        title,
        artist,
        genre,
        filePath: `uploads/${req.file.filename}`, // ✅ FIXED HERE
      });

      await song.save();
      return res.status(201).json(song);
    }

    // URL-based (YouTube or direct link)
    const { title, artist, url, genre } = req.body;

    if (!title || !artist) {
      return res.status(400).json({ message: "Title and artist are required" });
    }

    console.log("Received title:", title);
    console.log("Received artist:", artist);
    console.log("URL:", url);

    const song = new Song({
      userId,
      title,
      artist,
      genre,
      url,
    });

    await song.save();
    res.status(201).json(song);
  } catch (error) {
    console.error("❌ Error adding song:", error);
    res.status(500).json({ message: "Server error while adding song" });
  }
};

// GET /api/songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find({ userId: req.user._id });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};

// DELETE /api/songs/:id
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting song" });
  }
};
