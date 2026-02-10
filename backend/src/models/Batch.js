const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  exporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  productType: String,
  quantity: String,
  originLocation: String,
  destinationCountry: String,

  attachments: {
    labReport: String,
    images: [String]
  },

  status: {
    type: String,
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Batch", BatchSchema);
