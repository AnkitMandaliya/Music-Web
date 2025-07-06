// backend/middleware/multerConfig.js
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // folder must exist
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Filter (optional: only audio)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/mpeg", "audio/mp3"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only MP3 files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
