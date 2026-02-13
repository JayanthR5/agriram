const express = require("express");
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.json({
  "batchId": "B001",
  "productName": "Rice",
  "quantity": 100,
  "exporter": "AgriRam"
}
 );
});

module.exports = router;
