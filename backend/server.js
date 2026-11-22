require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN
}));
//auth routes
app.use("/api/v1/auth", authRoutes);

// Health check API
app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is working"
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port " + process.env.PORT);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();