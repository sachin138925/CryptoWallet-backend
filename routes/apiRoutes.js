// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// --- We are commenting out all controller imports to find the one that crashes the server ---
// const walletController = require('../controllers/wallet.controller');
// const transactionController = require('../controllers/transaction.controller');
// const contactController = require('../controllers/contact.controller');

// --- Keep ONLY the health check route ---
// This route has no dependencies and will work.
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy, router file loaded!' });
});

// --- Temporarily disable all other routes ---
// router.post('/wallet', walletController.createWallet);
// router.post('/wallet/:name', walletController.loadWallet);
// router.post('/tx/:hash', transactionController.logTransaction);
// router.get('/history/:address', transactionController.getHistory);
// router.get('/contacts/:walletAddress', contactController.getContacts);
// router.post('/contacts', contactController.addContact);
// router.delete('/contacts/:contactId', contactController.deleteContact);

module.exports = router;