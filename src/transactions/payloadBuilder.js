const logger = require('../utils/logger');

const { beginCell, Address, toNano } = require('@ton/core');

function generateJettonTransfer(amount,
    recipientJettonAddress, senderTonAddress, gasGee)
{
    try
    {
        const jettonAmount = Math.floor(amount * 1e6);
        
        const baseQueryId = BigInt(Date.now()) * BigInt(1000);
        const queryId = baseQueryId - (baseQueryId % BigInt(1000));

        logger.message(`Parsed jetton amount in nanoton: ${jettonAmount}`);
        logger.message(`Parsed quety id for transaction: ${queryId}`);

        const body = beginCell()
            .storeUint(0xf8a7ea5, 32)
            .storeUint(queryId, 64)
            .storeCoins(jettonAmount)
            .storeAddress(Address.parse(recipientJettonAddress))
            .storeAddress(Address.parse(senderTonAddress))
            .storeBit(0)
            .storeCoins(toNano(gasGee))
            .storeBit(0)
            .endCell();

        var payloadMessage = body.toBoc({ idx: false }).toString("base64");
        
        logger.message(`Created payload message for jetton transfer: ${payloadMessage}`);

        return {
            isSuccess: true,
            data: payloadMessage  
        };
    }
    catch (error)
    {
        var errorMessage = `Failed to generate jetton transfer payload, reason: ${error}`;

        logger.error(errorMessage);

        return { 
            isSuccess: false, 
            message: errorMessage
        };
    }
}

function generateNftTransfer()
{

}

module.exports =
{
    generateJettonTransfer,
};