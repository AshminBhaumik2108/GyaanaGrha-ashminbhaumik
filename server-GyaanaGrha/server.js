require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Importing the file for the Test...
const testRoutes = require("./routes/test.js");
const filteredRoutes = require("./routes/filteredRoutes.js");
const promptRoutes = require("./routes/promptRoutes.js")
const cartRoutes = require("./routes/cartData.js")
const favouriteRoutes = require("./routes/favouriteDataRoute.js")

// CORS Middleware - CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: [process.env.APPLICATION, "http://localhost:5173"], // NOTE : I have to change the Path...
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
    credentials: true,
  })
);

// Middleware of the file
app.use(express.json());

// SETTING UP THE MONGODB CONNECTION...
// Ensure MONGODB_URI is set
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("Error: MONGODB_URI is not set in the environment variables.");
  process.exit(1); // Exit process if MongoDB URI is missing.
  // IF mongo DB is not Working.
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Registered routes for the imports....
app.use('/test', testRoutes);
app.use('/', filteredRoutes);
app.use('/promptState', promptRoutes);
app.use('/cart', cartRoutes);
app.use('/favourite', favouriteRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Determine the correct server URL based on the environment
const URL = process.env.SERVER_DEVELOPMENT_URL || "http://localhost";

// Set PORT dynamically. (Mainly it will always be Active at port 3000).
const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
  // console.log(`CLIENT sending on ${process.env.CLIENT_URL}`);
  console.log(`SERVER listening on ${URL}:${PORT}`);
});

module.exports = app;
