import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import fs from "fs";

const imagesDir = path.join(path.resolve(), "images");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}


// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error(err);
  }
};

// Middleware configuration
dotenv.config();
app.use(express.json());

app.use("/images", express.static(imagesDir)); // Serve static files from the 'images' folder
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir); // Save images to the images directory
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img); // Use the img field from the request body as the filename
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

// Start the server
const PORT = process.env.PORT || 7005;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
