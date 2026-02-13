const express = require("express");
const router = express.Router();
const Inspection = require("../models/Inspection");

// CREATE inspection
router.post("/", async (req, res) => {
  const inspection = new Inspection(req.body);
  await inspection.save();
  res.json({
  "batchId": "B001",
  "inspector": "Gov QA",
  "qualityStatus": "Approved",
  "remarks": "Good quality"
}
);
});

// GET inspections
router.get("/", async (req, res) => {
  const data = await Inspection.find();
  res.json(data);
});

module.exports = router;
