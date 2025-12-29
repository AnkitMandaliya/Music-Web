import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
}); 

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["audio/mpeg", "audio/mp3"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only MP3 files are allowed"));
  }
};

export const upload = multer({ storage, fileFilter });

