import { Song } from "../models/Song.js"

export const addSong = async (req, res) => {
  try {
    const userId = req.user.id;

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
        filePath: `uploads/${req.file.filename}`, 
      });

      await song.save();
      return res.status(201).json(song);
    }

    
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


export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({ userId: req.user.id });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};


export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting song" });
  }
};

export const playlistController={addSong,deleteSong,getSongs}