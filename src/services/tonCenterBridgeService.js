const logger = require('../utils/logger');

const axios = require('axios');

require('dotenv').config();

const tonCenterApiUrl = `https://toncenter.com/api/v3`;
const tonCenterApiKey = process.env.TON_CENTER_API_KEY;

async function getJettonWallet(tonAddress, 
    jettonMasterAddress, limit, offset)
{
    if (!tonAddress || !jettonMasterAddress)
    {
        throw new Error(`Missing required params`);
    }

    if (!offset)
    {
        offset = 0;
    }

    const apiUrl = getJettonWalletResponseUrl(
        tonAddress, jettonMasterAddress, limit, offset);
    const config = getApiRequestConfig(apiUrl);

    const loadedWalletData = await fetchGetRequest(config);

    logger.message(`Parsed jetton wallet result: `+
        `${JSON.stringify(loadedWalletData)}`);

    return loadedWalletData.jetton_wallets[0];
}

async function getLastSuccessfulTransactions(
    tonAddress, transactionsType, limit, offset)
{
    if (!tonAddress || !transactionsType)
    {
        throw new Error(`Missing required params`);
    }

    if (!offset)
    {
        offset = 0;
    }

    const apiUrl = getLastTransactionsResponseUrl(
        tonAddress, transactionsType, limit, offset);
    const config = getApiRequestConfig(apiUrl);

    const transactions = await fetchGetRequest(config);

    logger.message(`Parsed successful transaction with `+
        `type: ${transactionsType}}, data: ${JSON.stringify(transactions)}`);

    return transactions;
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
        headers: { 'X-Api-Key': tonCenterApiKey }
    };
}

function getJettonWalletResponseUrl(
    tonAddress, jettonMaster, limit, offset)
{
    return `${tonCenterApiUrl}/jetton/wallets?`+
        `owner_address=${tonAddress}&jetton_address=${jettonMaster}&`+
        `exclude_zero_balance=false&limit=${limit}&offset=${offset}`;
}

function getLastTransactionsResponseUrl(
    ownerAddress, transactionsType, limit, offset)
{
    return `${tonCenterApiUrl}/jetton/transfers?`+
        `owner_address=${ownerAddress}&direction=${transactionsType}&`+
        `limit=${limit}&offset=${offset}`;
}

module.exports =
{
    getJettonWallet,
    getLastSuccessfulTransactions,
}