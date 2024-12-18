const logger = require('../utils/logger');
const payloadBuilder = require('../transactions/payloadBuilder');

const express = require('express');
const router = express.Router();

require('dotenv').config();

router.post('/assets/jetton/payload', (request, result) =>
{
    const { amount, recipientAddress, senderAddress, gasFee } = request.body;

    if (!amount || !recipientAddress || !senderAddress || !gasFee)
    {
        logger.error(`Failed to parse require body data`);

        return result.status(403).json(
        {
            isSuccess: false,
            message: "Missinng required parameters in body"
        });
    }

    logger.message(`Parsed amount: ${amount}, recipient: `+
        `${recipientAddress}, sender: ${senderAddress}, fee: ${gasFee}`);

    const generatedPayload = payloadBuilder.generateJettonTransfer(
        amount, recipientAddress, senderAddress, gasFee);

    if (!generatedPayload.isSuccess)
    {
        logger.error(`Failed to generate transaction payload`);

        return result.status(401).json(
        {
            isSuccess: false,
            message: generatedPayload.message
        });
    }

    result.status(200).json(
    {
        isSuccess: true,
        payload: generatedPayload.data
    });
});

router.post('/assets/nft/payload', (request, result) =>
{

});

module.exports = router;