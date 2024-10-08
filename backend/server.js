const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const songRoutes = require("./routes/songs");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

//Allow cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use the song routes
app.use("/api/songs", songRoutes);

// Defined a simple route for test purpose when first created the backend
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(process.env.MONGO_URI);
});
