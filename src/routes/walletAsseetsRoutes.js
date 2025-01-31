const { createJettonTransactionPayload, 
    createNftTransactionPayload }  = require('../controllers/walletAssetsController');

const express = require('express');
const router = express.Router();

router.post('/assets/jetton/payload', createJettonTransactionPayload);
router.post('/assets/nft/payload', createNftTransactionPayload);

module.exports = router;