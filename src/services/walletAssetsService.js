const logger = require('../utils/logger');
const payloadBuilder = require('../utils/payloadBuilder');

async function generateJettonTransactionPayload(amount, 
    recipientAddress, senderAddress, gasFee, jettonType, message)
{
    if (!amount || !recipientAddress || !senderAddress || !gasFee || !jettonType)
    {
        logger.error(`Failed to parse required body data for create jetton payload`);
    
        throw new Error("Missing required parameters in body");
    }

    logger.message(`Parsed jetton type: ${jettonType}, amount: ${amount}, `+
        `recipient: ${recipientAddress}, sender: ${senderAddress}, gas fee: ${gasFee}`);

    const generatedPayload = payloadBuilder.generateJettonTransferPayload(amount,
        recipientAddress, senderAddress, gasFee, jettonType, message)
    
    if (!generatedPayload.isSuccess)
    {
        logger.error(`Failed to generate jetton transaction `+
            `payload, reason: ${generatedPayload.message}`);

        throw new Error(generatedPayload.message);
    }

    logger.message(`Jetton transaction payload generated: ${generatedPayload.data}`);

    return {
        payload: generatedPayload.data
    }
}

async function generateNftTransactionPayload(
    recipientAddress, senderAddress)
{
    if (!recipientAddress || !senderAddress)
    {
        logger.error(`Failed to parse required body `+
            `data for create NFT payload`);

        throw new Error(`Missing required parameters in body`);
    }

    logger.message(`Parsed nft recipient: ${recipientAddress}, sender: ${senderAddress}`);

    const generatedPayload = payloadBuilder.generateNftTransferPayload(
        recipientAddress, senderAddress);
    
    if (!generatedPayload.isSuccess)
    {
        logger.error(`Failed to generate NFT transaction `+
            `payload, reason: ${generatedPayload.message}`);

        throw new Error(generatedPayload.message);
    }

    logger.message(`NFT transaction payload generated: ${generatedPayload.data}`);

    return {
        payload: generatedPayload.data
    }
}

module.exports =
{
    generateJettonTransactionPayload,
    generateNftTransactionPayload
};