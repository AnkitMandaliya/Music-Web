const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));


app.use(cors({
  origin: "https://music-web-2-8ne4.onrender.com/",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); 

const authRoutes = require("./routes/authRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/playlist", playlistRoutes); 


// const clientPath = path.join(__dirname, "../Client/dist");
// app.use(express.static(clientPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(clientPath, "index.html"));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
