const Batch = require("../models/Batch");

exports.createBatch = async (req, res) => {
  const batch = await Batch.create({
    exporterId: req.user.id,
    ...req.body
  });

  res.json(batch);
};

exports.getMyBatches = async (req, res) => {
  const batches = await Batch.find({ exporterId: req.user.id });
  res.json(batches);
};
