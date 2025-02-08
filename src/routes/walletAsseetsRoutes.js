const walletAssets = require('../controllers/walletAssetsController');

const express = require('express');
const router = express.Router();

router.post('/assets/jetton/payload', walletAssets.createJettonTransactionPayload);
router.post('/assets/nft/payload', walletAssets.createNftTransactionPayload);

module.exports = router;