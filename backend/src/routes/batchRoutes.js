const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createBatch, getMyBatches } = require("../controllers/batchController");

router.post("/", auth, createBatch);
router.get("/my", auth, getMyBatches);

module.exports = router;
