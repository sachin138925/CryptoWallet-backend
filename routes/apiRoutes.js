// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// --- We are commenting out all controller imports to find the one that crashes the server ---
// const walletController = require('../controllers/wallet.controller');
// const transactionController = require('../controllers/transaction.controller');
const contactController = require('../controllers/contact.controller'); // <-- UNCOMMENT THIS

// --- Keep ONLY the health check route ---
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy, contact controller loaded!' }); // Changed message for clarity
});

// --- Temporarily disable all other routes ---
// router.post('/wallet', walletController.createWallet);
// ...
router.get('/contacts/:walletAddress', contactController.getContacts); // <-- UNCOMMENT THIS
router.post('/contacts', contactController.addContact); // <-- UNCOMMENT THIS
router.delete('/contacts/:contactId', contactController.deleteContact); // <-- UNCOMMENT THIS

module.exports = router;