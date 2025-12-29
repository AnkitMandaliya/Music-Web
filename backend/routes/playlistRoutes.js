import express from "express";
import {playlistController} from "../controllers/playlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerConfig.js";

 const router = express.Router();

router.post("/songs", protect, upload.single("file"), playlistController.addSong);
router.get("/songs", protect, playlistController.getSongs);
router.delete("/songs/:id", protect, playlistController.deleteSong);

export const playlistRoutes= router


