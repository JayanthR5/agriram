const express = require("express");
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.json({ msg: "Batch route working" });
});

module.exports = router;
