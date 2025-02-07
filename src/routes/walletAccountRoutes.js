const accountController= require('../controllers/walletAccountController');

const express = require('express');
const router = express.Router();

router.get(`/account/:accountAddress/assets/jetton/:masterAddress/balance`,
    accountController.getJettonBalance);
router.get(`/account/:accountAddress/assets/jetton/:masterAddress`+
    `/limit/:limit/offset/:offset/wallet`, accountController.getJettonWallet);

router.get(`/account/:accountAddress/assets/nft/:collectionAddress/`+
    `limit/:limit/offset/:offset`, accountController.getTargetNftCollection);
router.get(`/account/:accountAddress/assets/nft/limit/:limit/offset/:offset`,
    accountController.getAllNftCollections);

module.exports = router;