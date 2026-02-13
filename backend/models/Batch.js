const express = require("express");
const router = express.Router();
const Batch = require("../models/Batch");

// CREATE batch
router.post("/", async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.json(batch);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all batches
router.get("/", async (req, res) => {
  const batches = await Batch.find();
  res.json(batches);
});

module.exports = router;
