// controllers/transaction.controller.js
const { JsonRpcProvider, Contract, Interface, formatEther, formatUnits } = require("ethers");
const TxLog = require('../models/txLog.model');

// --- Config (Should ideally move to a config file) ---
const provider = new JsonRpcProvider("https://bsc-testnet-dataseed.bnbchain.org");
const USDT_CONTRACT_ADDRESS = "0x787A697324dbA4AB965C58CD33c13ff5eeA6295F";
const USDC_CONTRACT_ADDRESS = "0x342e3aA1248AB77E319e3331C6fD3f1F2d4B36B1";
const ERC20_ABI = [ "event Transfer(address indexed from, address indexed to, uint256 value)", "function decimals() view returns (uint8)" ];
const erc20Interface = new Interface(ERC20_ABI);

exports.logTransaction = async (req, res) => {
    try {
        const { hash } = req.params;
        if(await TxLog.findOne({ hash })) return res.status(200).json({message: "Tx already logged."});
        const receipt = await provider.getTransactionReceipt(hash);
        if (!receipt) return res.status(404).json({ error: "Transaction not yet mined" });
        const block = await provider.getBlock(receipt.blockNumber);
        const tx = await provider.getTransaction(hash);
        let amountStr = "0", tokenName = "N/A", actualTo = receipt.to;

        if (tx.data === "0x") {
            amountStr = formatEther(tx.value);
            tokenName = "BNB";
        } else {
            const transferEventTopic = erc20Interface.getEvent("Transfer").topicHash;
            const tokenLog = receipt.logs.find(log => log.topics[0] === transferEventTopic);
            if (tokenLog) {
                const parsedLog = erc20Interface.parseLog(tokenLog);
                actualTo = parsedLog.args.to;
                const tokenContract = new Contract(tokenLog.address, ERC20_ABI, provider);
                amountStr = formatUnits(parsedLog.args.value, await tokenContract.decimals());
                if (tokenLog.address.toLowerCase() === USDT_CONTRACT_ADDRESS.toLowerCase()) tokenName = "USDT";
                else if (tokenLog.address.toLowerCase() === USDC_CONTRACT_ADDRESS.toLowerCase()) tokenName = "USDC";
                else tokenName = "Unknown";
            }
        }
        const logData = { hash: receipt.hash, from: receipt.from.toLowerCase(), to: (actualTo || receipt.to).toLowerCase(), blockNumber: receipt.blockNumber, amount: amountStr, tokenName, status: receipt.status === 1 ? "Success" : "Failed", timestamp: new Date(block.timestamp * 1000) };
        await TxLog.findOneAndUpdate({ hash }, logData, { upsert: true, new: true });
        res.status(201).json(logData);
    } catch (err) { res.status(500).json({ error: "Server error logging transaction" }); }
};

exports.getHistory = async (req, res) => {
    try {
        const { address } = req.params;
        const lowerCaseAddress = address.toLowerCase();
        const history = await TxLog.find({ $or: [{ from: lowerCaseAddress }, { to: lowerCaseAddress }] }).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
};