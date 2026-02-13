const VC = require("../models/VerifiableCredential");
const Log = require("../models/VerificationLog");

exports.verifyQR = async (req, res) => {

  const { qrHash } = req.body;

  const vc = await VC.findOne({ qrHash });

  if (!vc) {
    await Log.create({ status: "INVALID" });
    return res.json({ status: "INVALID" });
  }

  await Log.create({
    vcId: vc._id,
    verifiedBy: "CUSTOMS",
    status: "VALID"
  });

  res.json({
    status: "VALID",
    credential: vc.vc
  });
};
