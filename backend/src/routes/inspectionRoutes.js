const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/inspectionController");

router.get("/pending", auth, controller.getPendingBatches);
router.post("/", auth, controller.submitInspection);

module.exports = router;
