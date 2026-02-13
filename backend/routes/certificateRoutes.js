const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

router.post("/", async (req, res) => {
  const cert = new Certificate(req.body);
  await cert.save();
  res.json({
  "batchId": "B001",
  "status": "Certified"
}
);
});

router.get("/", async (req, res) => {
  const certs = await Certificate.find();
  res.json(certs);
});

module.exports = router;
