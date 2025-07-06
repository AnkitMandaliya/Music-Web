import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { fetchSongs, deleteSong } from "./api";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // 🌙 Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // 🌙 Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🧠 Fetch Songs
  useEffect(() => {
    if (token) {
      fetchSongs(token)
        .then((data) => setSongs(data))
        .catch((err) => console.error("Error loading songs:", err));
    }
  }, [token]);

  // 🔁 Auth Sync
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // ➕ Add Song
  const handleAddSong = (newSong) => {
    setSongs((prev) => [...prev, newSong]);
  };

  // ❌ Delete Song
  const handleDeleteSong = async (id) => {
    try {
      await deleteSong(id, token);
      setSongs((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete song.");
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen w-screen transition-colors duration-300 
        ${theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white to-blue-100 text-black"}`}
    >
      {/* 🎧 Header */}
      <header className="w-full text-center mb-6 px-4 mt-5">
        <h1 className={`text-xl sm:text-3xl md:text-4xl font-bold border-2 border-dashed rounded-lg py-3 sm:py-4 shadow-md 
          ${theme === "dark" 
            ? "text-pink-300 border-pink-500 bg-gradient-to-r from-gray-800 to-gray-700"
            : "text-blue-800 border-blue-400 bg-gradient-to-r from-blue-100 to-blue-200"}`}>
          <span className="inline-block transition-transform duration-300 hover:scale-125 hover:pr-3">
            🎧
          </span> My Playlist
        </h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-3 px-4 py-2 rounded-md border text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 transition"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* 🌐 Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
        <NavLink to="/" className={ `${theme === "dark"?"text-yellow-400":"text-blue-600"} hover:underline text-sm sm:text-base`}>
          Home
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink to="/songs" className={ `${theme === "dark"?"text-yellow-400":"text-blue-600"} hover:underline text-sm sm:text-base`}>
              Songs
            </NavLink>
            <NavLink to="/addsong" className={ `${theme === "dark"?"text-yellow-400":"text-blue-600"} hover:underline text-sm sm:text-base`}>
              Add Song
            </NavLink>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className={ `${theme === "dark"?"text-yellow-400":"text-blue-600"} hover:underline text-sm sm:text-base`}>
              Login
            </NavLink>
            <NavLink to="/register" className={ `${theme === "dark"?"text-yellow-400":"text-blue-600"} hover:underline text-sm sm:text-base`}>
              Register
            </NavLink>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="bg-blue-500 dark:bg-pink-600 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-pink-700 transition duration-200 shadow"
          >
            Logout
          </button>
        )}
      </nav>

      {/* 📄 Routes */}
      <main className="flex-grow overflow-y-auto w-full px-4 sm:px-6 lg:px-8 mt-5">
        <Routes>
          <Route path="/" element={<Home logged={isLoggedIn} />} />
          <Route
            path="/songs"
            element={
              isLoggedIn ? (
                <SongList songs={songs} onDelete={handleDeleteSong} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/addsong"
            element={
              isLoggedIn ? (
                <SongForm onAddSong={handleAddSong} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
