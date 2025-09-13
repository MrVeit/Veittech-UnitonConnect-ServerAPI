const tonCenterBridge = require('../services/tonCenterBridgeService');
const tonApiBridge = require('../services/tonApiBridgeService');

const accountService = require('../services/walletAccountService');

exports.getJettonBalance = async (request, result) =>
{
    const { accountAddress, masterAddress } = request.params;
    
    try
    {
        const loadedBalanceProcess = await tonApiBridge
            .getJettonBalance(accountAddress, masterAddress);
    
        return result.status(200).json(
        {
            jettonBalance: loadedBalanceProcess.jettonBalance
        });
    }
    catch (error)
    {
        return result.status(400).json(
        {
            isSuccess: false,
            message: error.message
        });
    }
}
    
exports.getJettonWallet = async (request, result) =>
{
    const { accountAddress, masterAddress, limit, offset } = request.params;

    try
    {
        const loadedWalletProcess = await tonCenterBridge
            .getJettonWallet(accountAddress, masterAddress, limit, offset);

        return result.status(200).json(
        {
            jettonWallet: loadedWalletProcess
        });
    }
    catch (error)
    {
        return result.status(400).json(
        {
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getAllNftCollections = async (request, result) =>
{
    const { accountAddress, limit, offset } = request.params;

    try
    {
        const loadedCollectionsProcess = await tonApiBridge
            .getAllNftsByWallet(accountAddress, limit, offset);

        return result.status(200).json(
        {
            nftItems: loadedCollectionsProcess.allNftCollections.nft_items
        });
    }
    catch (error)
    {
        return result.status(400).json(
        {
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getTargetNftCollection = async (request, result) =>
{
    const { accountAddress, collectionAddress, limit, offset } = request.params;

    try
    {
        const loadedTargetCollectionProcess = await tonApiBridge
            .getTargetNftCollectionByWallet(accountAddress,collectionAddress, limit, offset);

        return result.status(200).json(
        {
            nftItems: loadedTargetCollectionProcess.targetNftCollection.nft_items
        });
    }
    catch (error)
    {
        return result.status(400).json(
        {
            isSuccess: false,
            message: error.message
        });
    }
}

exports.verifySignedPayload = async (request, result) =>
{
    const { signature, address, timestamp, domain,
        messagePayload, walletPublicKey, walletStateInit } = request.body;

    try
    {
        const isVerified = await accountService.verifySignedData(
            signature, address, timestamp, domain, messagePayload,
            walletPublicKey, walletStateInit);

        return result.status(200).json(
        {
            isVerified,
            signedMessage: messagePayload
        });
    }
    catch (error)
    {
        return result.status(400).json(
        {
            isSuccess: false,
            message: error.message
        });
    }
}