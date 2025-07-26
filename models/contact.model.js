const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, index: true },
  contactName: { type: String, required: true },
  contactAddress: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);