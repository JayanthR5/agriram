const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const Inspection = require("../models/Inspection");

router.get("/:batchId", async (req, res) => {
  const batchId = req.params.batchId;

  const cert = await Certificate.findOne({ batchId });
  const inspect = await Inspection.findOne({ batchId });

  if (!cert || !inspect) {
    return res.json({ verified: false });
  }

  res.json({
    verified: true,
    certificate: cert,
    inspection: inspect
  });
});

module.exports = router;
