const logger = require('../utils/logger');

const express = require('express');
const router = express.Router();

require('dotenv').config();

const CLIENT_SECRET_KEY = process.env.SECRET_KEY;

router.post('/auth/sign-in', (request, result) =>
{

});

module.exports = router;