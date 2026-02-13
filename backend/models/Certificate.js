const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  batchId: String,
  status: String,
  issuedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Certificate", certSchema);
