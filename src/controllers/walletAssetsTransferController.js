const { getLastSuccessfulTransactions } = require('../services/tonCenterBridgeService'); 

exports.getLastJettonTransactions = async (request, result) =>
{
    const { accountAddress, transactionsType, limit, offset } = request.params;

    try
    {
        const loadedTransactionsProcess = await getLastSuccessfulTransactions(
            accountAddress, transactionsType, limit, offset);

        return result.status(200).json(
        {
            jettonTransactions: loadedTransactionsProcess.jetton_transfers
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
