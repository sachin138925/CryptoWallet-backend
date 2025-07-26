const bcrypt = require('bcryptjs'); // Use bcryptjs instead
const Wallet = require('../models/wallet.model');

exports.createWallet = async (req, res) => {
    try {
        const { name, address, privateKey, mnemonic, password } = req.body;
        if (!name?.trim() || !password?.trim()) {
            return res.status(400).json({ error: "Name & password required" });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        await new Wallet({ name, address, privateKey, mnemonic, passwordHash }).save();
        res.status(201).json({ message: "Wallet saved!" });
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: "Wallet name already exists" });
        res.status(500).json({ error: "Server error during wallet creation" });
    }
};

exports.loadWallet = async (req, res) => {
    try {
        const { name } = req.params;
        const { password } = req.body;
        const wallet = await Wallet.findOne({ name });
        if (!wallet) return res.status(404).json({ error: "Wallet not found" });

        const isPasswordCorrect = await bcrypt.compare(password, wallet.passwordHash);
        if (!isPasswordCorrect) return res.status(401).json({ error: "Invalid password" });

        const { passwordHash, ...walletData } = wallet.toObject();
        res.json(walletData);
    } catch (err) {
        res.status(500).json({ error: "Server error while fetching wallet" });
    }
};