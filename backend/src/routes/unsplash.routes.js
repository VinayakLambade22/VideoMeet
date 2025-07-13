import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/random-image", async (req, res) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: { query: "wallpaper", orientation: "landscape" },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    const imageUrl = response.data.urls.full;
    res.json({ imageUrl });
  } catch (err) {
    console.error("Unsplash API error:", err.message);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

export default router;
