const { parseAvatarByUrl } = require('../controllers/extensionsController');

const express = require('express');
const router = express.Router();

router.get('/assets/item-icon', parseAvatarByUrl);

module.exports = router;