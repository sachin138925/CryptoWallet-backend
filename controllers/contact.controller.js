// controllers/contact.controller.js
const Contact = require('../models/contact.model');

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ walletAddress: req.params.walletAddress });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch contacts." });
    }
};

exports.addContact = async (req, res) => {
    try {
        const { walletAddress, contactName, contactAddress } = req.body;
        if (!walletAddress || !contactName || !contactAddress) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newContact = new Contact({ walletAddress, contactName, contactAddress });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ error: "Failed to save contact." });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.contactId);
        if (!result) return res.status(404).json({ error: "Contact not found." });
        res.status(200).json({ message: "Contact deleted." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete contact." });
    }
};