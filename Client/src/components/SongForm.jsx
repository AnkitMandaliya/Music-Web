import { useState } from "react";
import { Input, Button } from "./input";
import { addSong } from "../api";

export function SongForm({ onAddSong }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title || !artist || (!audioFile && !url)) {
      alert("Please fill title, artist, and either upload a file or enter a URL.");
      return;
    }

    try {
      let savedSong;

      if (audioFile) {
        const allowedTypes = ["audio/mpeg", "audio/mp3"];
        if (!allowedTypes.includes(audioFile.type)) {
          alert("Only MP3 files are allowed.");
          return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("artist", artist.trim());
        formData.append("genre", genre.trim());
        formData.append("file", audioFile);

        savedSong = await addSong(formData, token);

if (!savedSong._id) {
  const fetched = await fetch(`${import.meta.VITE_API_URL}/api/songs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const latestSongs = await fetched.json();
  savedSong = latestSongs[latestSongs.length - 1];
}

      } else {
        const audioExtensions = /\.(mp3|wav|ogg|m4a)$/i;
        const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

        if (!audioExtensions.test(url) && !isYouTube) {
          alert("URL must point to a valid audio file or YouTube link.");
          return;
        }

        const newSong = {
          title: title.trim(),
          artist: artist.trim(),
          genre: genre.trim(),
          url: url.trim(),
        };

        savedSong = await addSong(newSong, token);
      }

      onAddSong((prev) => [...prev, savedSong]);
      alert(`Song "${title}" added successfully! 🎶`);

      setGenre("");
      setTitle("");
      setArtist("");
      setAudioFile(null);
      setUrl("");
      e.target.reset();
    } catch (err) {
      console.error("Song upload failed:", err);
      alert("❌ Failed to add song");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Add a Song
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg bg-white text-gray-800 mb-0"
        >
          <option value="">Select Genre</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="other">Other</option>
        </select>

        <Input
          type="text"
          placeholder="Enter song name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Enter artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Enter song URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={!!audioFile}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-base sm:text-lg md:text-xl"
        />
        <input
          type="file"
          accept=".mp3,audio/mpeg"
          onChange={(e) => setAudioFile(e.target.files[0])}
          disabled={!!url}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 text-base sm:text-lg md:text-xl"
        />
        {audioFile && (
          <p className="text-white text-sm italic">
            URL disabled because file is selected
          </p>
        )}
        {url && (
          <p className="text-white text-sm italic">
            File input disabled because URL is entered
          </p>
        )}

        <Button text="Add Song" />
      </form>
    </div>
  );
}
