import { useState } from "react";
import { SongItem } from "./SongItem";

export function SongList({ onDelete, songs }) {
  const [searchTheme, SetSearchTheme] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  if (!Array.isArray(songs) || songs.length === 0) {
    return (
      <p className="text-blue-500 text-center mt-10">No songs to display.</p>
    );
  }

  let filteredSong = songs
    .filter((s) => s && typeof s === "object")
    .filter((s) => {
      const title = s.title?.toLowerCase() || "";
      const artist = s.artist?.toLowerCase() || "";
      const genre = s.genre?.toLowerCase() || "";
      const query = searchTheme.toLowerCase();

      return title.includes(query) || artist.includes(query) || genre.includes(query);
    });

  filteredSong = filteredSong.sort((a, b) => {
    const fieldA = (a[sortBy] || "").toLowerCase();
    const fieldB = (b[sortBy] || "").toLowerCase();

    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  return (
    <div className="border-2 border-dashed border-blue-500 rounded-lg p-6 w-full max-w-4xl mx-auto mt-10 bg-white shadow">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
        🎶 Display Songs
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="genre">Sort by Genre</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="asc">Ascending (A–Z)</option>
          <option value="desc">Descending (Z–A)</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Enter Title or Artist to search"
          value={searchTheme}
          onChange={(e) => SetSearchTheme(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-white-800"
        />
        <button
          onClick={async () => {
            for (let s of songs) {
              await onDelete(s._id);
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
        >
          Clear Playlist
        </button>
      </div>

      <ul className="flex flex-col gap-4 w-full">
        {filteredSong.length > 0 ? (
          filteredSong.map((song) => (
            <li
              key={song._id || song.id}
              className="bg-white border border-purple-300 rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center rounded-full text-2xl mx-auto sm:mx-0">
                🎵
              </div>
              <div className="flex-1 text-center sm:text-left">
                <SongItem song={song} onDelete={onDelete} />
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-blue-500 col-span-full">
            No matching songs found.
          </p>
        )}
      </ul>
    </div>
  );
}
