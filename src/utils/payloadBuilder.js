const logger = require('./logger');
const coin = require('./coinConverter');

const { beginCell, Address } = require('@ton/core');

let stableJettons = 
[
    "USDT", "AquaUSD", "jUSDT", "jUSDC"
];

function generateJettonTransferPayload(amount, recipient, 
    sender, gasGee, jettonType, message)
{
    var jettonAmount = 0;

    var foundedStableCoin = stableJettons.find(
        jetton => jetton === jettonType);

    try
    {
        if (foundedStableCoin)
        {
            jettonAmount = coin.toUSDtNanoton(amount);

            logger.message(`Detected stablecoin, value `+
                `converted to custom value: ${jettonAmount}`);
        }
        else
        {
            jettonAmount = coin.toNanoton(amount);

            logger.message(`Transfer value converted to `+
                `base jetton nano format: ${jettonAmount}`);
        }

        const gasFeeAmount = coin.toNanoton(gasGee);
        
        const baseQueryId = BigInt(Date.now()) * BigInt(1000);
        const queryId = baseQueryId - (baseQueryId % BigInt(1000));

        logger.message(`Parsed jetton amount in nanoton: ${jettonAmount}`);
        logger.message(`Parsed query id for transaction: ${queryId}`);

        var body;

        if (!message)
        {
            body = getBodyForJettonTransfer(queryId, 
                jettonAmount, recipient, sender, gasFeeAmount);
        }
        else
        {
            body = getBodyForJettonTransferWithMessage(queryId,
                jettonAmount, recipient, sender, gasFeeAmount, message);
        }

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

function generateNftTransferPayload(recipient, sender)
{
    const baseQueryId = BigInt(Date.now()) * BigInt(1000);
    const queryId = baseQueryId - (baseQueryId % BigInt(1000));

    logger.message(`Parsed quety id for transaction: ${queryId}`);

    try
    {
        var body = getBodyForNftTransfer(queryId, recipient, sender);

        var payloadMessage = body.toBoc({ idx: false }).toString("base64");
        
        logger.message(`Created payload message for NFT transfer: ${payloadMessage}`);

        return {
            isSuccess: true,
            data: payloadMessage  
        };
    }
    catch (error)
    {
        var errorMessage = `Failed to generate NFT `+
            `transfer payload, reason: ${error}`;

        logger.error(errorMessage);

        return { 
            isSuccess: false, 
            message: errorMessage
        };
    }
}

function getBodyForNftTransfer(
    queryId, recipient, sender)
{
    const body = beginCell()
        .storeUint(0x5fcc3d14, 32)
        .storeUint(queryId, 64)
        .storeAddress(Address.parse(recipient))
        .storeAddress(Address.parse(sender))
        .storeUint(0, 1)
        .storeCoins(1)
        .storeUint(0, 1)
        .endCell();

    logger.message(`Created nft body for `+
        `transfer without message: ${body}`);
    
    return body;
}

function getBodyForJettonTransfer(queryId, 
    amount, recipient, sender, gasFee)
{
    const body = beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(queryId, 64)
        .storeCoins(amount)
        .storeAddress(Address.parse(recipient))
        .storeAddress(Address.parse(sender))
        .storeBit(0)
        .storeCoins(gasFee)
        .storeBit(0)
        .endCell();

    logger.message(`Created jetton body for `+
        `transfer without message: ${body}`);

    return body;
}

function getBodyForJettonTransferWithMessage(queryId, 
    amount, recipient, sender, gasFee, message)
{
    const forwardPayload = beginCell()
        .storeUint(0, 32)
        .storeStringTail(message)
        .endCell();

    const body = beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(queryId, 64)
        .storeCoins(amount)
        .storeAddress(Address.parse(recipient))
        .storeAddress(Address.parse(sender))
        .storeBit(0)
        .storeCoins(gasFee)
        .storeBit(1)
        .storeRef(forwardPayload)
        .endCell();

    logger.message(`Created jetton body for `+
        `transfer with message '${message}', `+
        `value: ${body}`);

    return body;
}

module.exports =
{
    generateJettonTransferPayload,
    generateNftTransferPayload,
};