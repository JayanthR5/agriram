const router = require("express").Router();
const controller = require("../controllers/verifyController");

router.post("/", controller.verifyQR);

module.exports = router;
