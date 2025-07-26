// models/wallet.model.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  privateKey: { type: String, required: true },
  mnemonic: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

module.exports = mongoose.model("Wallet", walletSchema);