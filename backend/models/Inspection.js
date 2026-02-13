const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
  batchId: String,
  inspector: String,
  qualityStatus: String,
  remarks: String,
  inspectedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inspection", inspectionSchema);
