const { generateJettonTransactionPayload,
    generateNftTransactionPayload } = require('../services/walletAssetsService');

exports.createJettonTransactionPayload = async (request, result) =>
{
    const { amount, recipientAddress, 
        senderAddress, gasFee, jettonType } = request.body;

    try
    {
        const generatedPayloadProcess = await generateJettonTransactionPayload(
            amount, recipientAddress, senderAddress, gasFee, jettonType);

        return result.status(200).json(
        {
            isSuccess: true,
            payload: generatedPayloadProcess.payload
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

exports.createNftTransactionPayload = async (request, result) =>
{
    try
    {
        return result.status(200).json(
        {
            isSuccess: true
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