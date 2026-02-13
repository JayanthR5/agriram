const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
  vcId: mongoose.Schema.Types.ObjectId,
  verifiedBy: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model("VerificationLog", VerificationSchema);
