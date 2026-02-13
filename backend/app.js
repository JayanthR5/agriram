require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/batches", require("./routes/batchRoutes"));
app.use("/api/inspections", require("./routes/inspectionRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/verify", require("./routes/verifyRoutes"));

// Port
const PORT = process.env.PORT || 5000;

// Start Server (ONLY ONCE)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
