const assetsTransferController = require('../controllers/walletAssetsTransferController');

const express = require('express');
const router = express.Router();

router.get(`/account/:accountAddress/assets/jetton/transactions/`+
    `:transactionsType/limit/:limit/offset/:offset`, assetsTransferController.getLastJettonTransactions);

module.exports = router;