const logger = require('../utils/logger');

const axios = require('axios');

require('dotenv').config();

const tonApiUrl = `https://tonapi.io/v2`;
const tonApiKey = process.env.TON_API_KEY;

async function getAllNftsByWallet(
    tonAddress, limit, offset)
{
    if (!tonAddress || !limit)
    {
        throw new Error("Missing required params");
    }

    const apiUrl = getAllnftsRequestUrl(tonAddress, limit, offset);
    const config = getApiRequestConfig(apiUrl);

    const allNftCollections = await fetchGetRequest(config);

    logger.message(`Parsed all nft collections by `+
        `wallet: ${tonAddress}, value: ${JSON.stringify(allNftCollections)}`);

    return {
        allNftCollections
    };
}

async function getTargetNftCollectionByWallet(
    tonAddress, collectionAddress, limit, offset)
{
    if (!tonAddress || !limit)
    {
        throw new Error("Missing required params");
    }

    const apiUrl = getTargetNftsRequestUrl(
        tonAddress, collectionAddress, limit, offset);
    const config = getApiRequestConfig(apiUrl);

    const targetNftCollection = await fetchGetRequest(config);

    logger.message(`Parsed target nft collection `+
        `${collectionAddress}, value: ${JSON.stringify(targetNftCollection)}`);

    return {
        targetNftCollection
    };
}

async function getJettonBalance(
    tonAddress, masterAddress)
{
    if (!tonAddress || !masterAddress)
    {
        throw new Error("Missing required params");
    }

    const apiUrl = getJettonBalanceRequestUrl(tonAddress, masterAddress);
    const config = getApiRequestConfig(apiUrl);

    const jettonBalance = await fetchGetRequest(config);

    logger.message(`Parsed jetton balance by wallet: `+
        `${tonAddress}, value: ${JSON.stringify(jettonBalance)}`);

    return {
        jettonBalance
    };
}

async function fetchGetRequest(config)
{
    try
    {
        const request = await axios(config);
        const requestData = request.data;

        return requestData;
    }
    catch (error)
    {
        logger.error(`Failed to fetch response, reason: ${error.message}`);

        throw new Error(error.message);
    }
}

function getApiRequestConfig(url)
{
    return {
        method: 'get',
        url: url,
        headers:
        {
            'Authorization': `Bearer ${tonApiKey}`
        }
    };
}

function getTargetNftsRequestUrl(tonAddress,
    collectionAddress, limit, offset)
{
    return `${tonApiUrl}/accounts/${tonAddress}/nfts?`+
        `collection=${collectionAddress}&limit=${limit}&`+
        `offset=${offset}&indirect_ownership=false`
}

function getAllnftsRequestUrl(
    tonAddress, limit, offset)
{
    return `${tonApiUrl}/accounts/${tonAddress}/nfts?`+
        `limit=${limit}&offset=${offset}&indirect_ownership=false`
}

function getJettonBalanceRequestUrl(
    tonAddress, masterAddress)
{
    return `${tonApiUrl}/accounts/${tonAddress}/jettons/${masterAddress}`
}

module.exports =
{
    getAllNftsByWallet,
    getTargetNftCollectionByWallet,
    getJettonBalance,
};