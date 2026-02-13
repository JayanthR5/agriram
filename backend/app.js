require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
git
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running"));


// connect  router
app.use("/api/batches", require("./routes/batchRoutes"));

///add route 
app.use("/api/inspections", require("./routes/inspectionRoutes"));


//
app.use("/api/certificates", require("./routes/certificateRoutes"));


///

app.use("/api/verify", require("./routes/verifyRoutes"));
