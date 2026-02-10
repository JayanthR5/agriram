const Inspection = require("../models/Inspection");
const Batch = require("../models/Batch");

exports.getPendingBatches = async (req, res) => {
  const batches = await Batch.find({ status: "PENDING" });
  res.json(batches);
};

exports.submitInspection = async (req, res) => {
  const { batchId, parameters, result, remarks } = req.body;

  const inspection = await Inspection.create({
    batchId,
    qaAgencyId: req.user.id,
    parameters,
    result,
    remarks
  });

  await Batch.findByIdAndUpdate(batchId, { status: "INSPECTED" });

  res.json(inspection);
};
