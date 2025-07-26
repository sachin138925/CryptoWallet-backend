// models/txLog.model.js
const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
  hash: { type: String, unique: true, required: true },
  from: String,
  to: String,
  amount: String,
  tokenName: String,
  blockNumber: Number,
  status: String,
  timestamp: Date,
});

module.exports = mongoose.model("TxLog", txSchema);