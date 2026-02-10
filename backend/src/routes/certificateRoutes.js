const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { issueVC, getMyCertificate } = require("../controllers/certificateController");

router.get("/my", auth, getMyCertificate);

module.exports = router;



