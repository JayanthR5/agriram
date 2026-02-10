const mongoose = require("mongoose");

const VCSchema = new mongoose.Schema({
  batchId: mongoose.Schema.Types.ObjectId,
  issuerDid: String,
  holderDid: String,
  vc: Object,
  qrHash: String
}, { timestamps: true });

module.exports = mongoose.model("VerifiableCredential", VCSchema);
