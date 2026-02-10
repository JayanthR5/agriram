// Certificate Controller
const QRCode = require("qrcode");
const crypto = require("crypto");

const VC = require("../models/VerifiableCredential");
const Batch = require("../models/Batch");
const Inspection = require("../models/Inspection");

/**
 * Issue Verifiable Credential after successful inspection
 */
exports.issueVC = async (req, res) => {
  try {
    const { batchId } = req.body;

    const batch = await Batch.findById(batchId).populate("exporterId");
    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    const inspection = await Inspection.findOne({ batchId });
    if (!inspection || inspection.result !== "PASS") {
      return res.status(400).json({ msg: "Inspection not passed" });
    }

    const vcPayload = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential", "AgriQualityCertificate"],
      issuer: req.user.id,
      issuanceDate: new Date(),
      credentialSubject: {
        batchId,
        product: batch.productType,
        quality: inspection.parameters
      }
    };

    const qrHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(vcPayload))
      .digest("hex");

    const savedVC = await VC.create({
      batchId,
      issuerDid: "did:agri:qa123",
      holderDid: "did:agri:exporter456",
      vc: vcPayload,
      qrHash
    });

    await Batch.findByIdAndUpdate(batchId, { status: "CERTIFIED" });

    res.status(201).json(savedVC);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to issue certificate" });
  }
};

/**
 * Get certificate for logged-in exporter
 */
exports.getMyCertificate = async (req, res) => {
  try {
    const cert = await VC.findOne({
      holderDid: "did:agri:exporter456"
      // ideally: holderDid: req.user.did
    });

    if (!cert) {
      return res.status(404).json({ msg: "No certificate found" });
    }

    const qrCode = await QRCode.toDataURL(cert.qrHash);

    res.json({
      vc: cert.vc,
      qrCode
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch certificate" });
  }
};
