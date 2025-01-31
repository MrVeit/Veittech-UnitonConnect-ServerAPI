const logger = require('../utils/logger');
const payloadBuilder = require('../utils/payloadBuilder');

async function generateJettonTransactionPayload(amount, 
    recipientAddress, senderAddress, gasFee, jettonType)
{
    if (!amount || !recipientAddress || !senderAddress || !gasFee)
    {
        logger.error(`Failed to parse required body data for create jetton payload`);
    
        throw new Error("Missinng required parameters in body");
    }

    logger.message(`Parsed jetton type: ${jettonType}, amount: ${amount}, `+
        `recipient: ${recipientAddress}, sender: ${senderAddress}, gas fee: ${gasFee}`);

    const generatedPayload = payloadBuilder.generateJettonTransfer(amount,
        recipientAddress, senderAddress, gasFee, jettonType)
    
    if (!generatedPayload.isSuccess)
    {
        logger.message(`Failed to generate jetton transaction `+
            `payload, reason: ${generatedPayload.message}`);

        throw new Error(generatedPayload.message);
    }

    logger.message(`Jetton transaction payload generated: ${generatedPayload.data}`);

    return {
        payload: generatedPayload.data
    }
}

async function generateNftTransactionPayload()
{

}

module.exports =
{
    generateJettonTransactionPayload,
    generateNftTransactionPayload
};