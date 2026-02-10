const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch"
  },

  qaAgencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  parameters: Object,

  result: {
    type: String,
    enum: ["PASS", "FAIL"]
  },

  remarks: String

}, { timestamps: true });

module.exports = mongoose.model("Inspection", InspectionSchema);
