const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ FIX: Needed for multipart/form-data text fields
app.use("/uploads", express.static("uploads")); // serve uploaded files

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", playlistRoutes);

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server started on http://localhost:5000"));
