// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Import all controllers
const walletController = require('../controllers/wallet.controller');
const transactionController = require('../controllers/transaction.controller');
const contactController = require('../controllers/contact.controller');

// --- NEW HEALTH CHECK ROUTE ---
// This route has no dependencies and helps us test if the server is alive.
router.get('/health', (req, res) => {
  console.log("Health check endpoint was hit!");
  res.status(200).json({ status: 'API is healthy' });
});

// --- Wallet Routes ---
router.post('/wallet', walletController.createWallet);
router.post('/wallet/:name', walletController.loadWallet);

// --- Transaction Routes ---
router.post('/tx/:hash', transactionController.logTransaction);
router.get('/history/:address', transactionController.getHistory);

// --- Contact Routes ---
router.get('/contacts/:walletAddress', contactController.getContacts);
router.post('/contacts', contactController.addContact);
router.delete('/contacts/:contactId', contactController.deleteContact);

module.exports = router;