const { Address, beginCell, Cell,
    loadStateInit, contractAddress} = require('@ton/core');
const { sha256 } = require('@ton/crypto');
const { Buffer } = require('buffer');
const { crc32 } = require('crc-32');
const nacl = require("tweetnacl");

require('dotenv').config();

const logger = require('../utils/logger');

async function verifySignedData(signature, address, timestamp,
    domain, messagePayload, walletPublicKey, walletStateInit)
{
    const validAuthTime = 15 * 60;

    const currentAppDomain = process.env.APP_DOMAIN || "";

    try
    {
        if (!signature || !address || !timestamp ||
            !domain || !walletPublicKey || !walletStateInit)
        {
            logger.warning(`Not enough info to check the signed payload`);

            throw new Error("Missing required data for verify");
        }

        if (!messagePayload)
        {
            logger.warning(`Signed message payload not exist, signature: `+
                `'${signBytes}', address: ${address}, timestamp: ${timestamp}`);

            throw new Error("Signed message payload not exist");
        }

        if (!currentAppDomain ||
            domain !== currentAppDomain)
        {
            logger.warning(`Invalid app domain `+
                `'${domain}', payload verify failed`);

            throw new Error("Invalid app domain from message payload");
        }

        const now = Math.floor(Date.now() / 1000);

        if (now - validAuthTime > timestamp)
        {
            logger.warning(`Payload timestamp '${timestamp}' is expired`);

            throw new Error("Payload timestamp has expired");
        }

        const parsedAddress = Address.parse(address);
        const stateInit = loadStateInit(Cell.
            fromBase64(walletStateInit).beginParse()
        );

        logger.message(`Parsed wallet address: ${parsedAddress}`);

        const wantedAddress = Address.parse(address);

        const contractAddr = contractAddress(
            wantedAddress.workChain, stateInit);

        logger.message(`Parsed contract address: ${JSON.stringify(contractAddr)}`);

        if (!contractAddr.equals(wantedAddress))
        {
            logger.warning(`Invalid wallet contract address `+
                `'${contractAddr}' by wallet '${wantedAddress}'`);

            throw new Error("Invalid wallet contract address");
        }

        const finalHash = messagePayload.type === "cell" ? 
            createCellHash(messagePayload, parsedAddress, domain, timestamp) :
            await createTextBinaryHash(messagePayload, parsedAddress, domain, timestamp);

        const signBytes = Buffer.from(signature, "base64");
        const publicKeyBytes = parseHexOrBase64PublicKey(walletPublicKey);

        const isValid = nacl.sign.detached.verify(
            new Uint8Array(finalHash),
            new Uint8Array(signBytes),
            new Uint8Array(publicKeyBytes)
        );

        logger.message(`Status check on signed wallet message: ${isValid}`);

        return isValid;
    }
    catch (error)
    {
        logger.error(`Sign data verification `+
            `failed, reason: ${error.message}`);

        throw new Error(error.message);
    }
}

async function createTextBinaryHash(
    payload, parsedAddress, domain, timestamp)
{
    const workchainBuffer = Buffer.alloc(4);

    workchainBuffer.writeInt32BE(parsedAddress.workChain);

    const domainBuffer = Buffer.from(domain, "utf8");
    const domainLenBuffer = Buffer.alloc(4);

    domainLenBuffer.writeUint32BE(domainBuffer.length);

    const timestampBuffer = Buffer.alloc(8);

    timestampBuffer.writeBigUint64BE(BigInt(timestamp));

    const typePrefix = payload.type === "text" ? "txt" : "bin";
    const content = payload.type === "text" ? payload.text : payload.bytes;
    const encoding = payload.type === "text" ? "utf8" : "base64";

    const payloadPrefix = Buffer.from(typePrefix);
    const payloadBuffer = Buffer.from(content, encoding);
    const payloadLenBuffer = Buffer.alloc(4);

    payloadLenBuffer.writeUInt32BE(payloadBuffer.length);

    const message = Buffer.concat(
    [
        Buffer.from([0xff, 0xff]),
        Buffer.from("ton-connect/sign-data/"),
        workchainBuffer,
        parsedAddress.hash,
        domainLenBuffer,
        domainBuffer,
        timestampBuffer,
        payloadPrefix,
        payloadLenBuffer,
        payloadBuffer
    ]);

    const hash = await sha256(message);

    return Buffer.from(hash);
}

function createCellHash(payload,
    parsedAddress, domain, timestamp)
{
    if (payload.type !== "cell")
    {
        return null;
    }

    const cell = Cell.fromBase64(payload.cell);
    const schemaHash = crc32.buf(Buffer.from(
        payload.schema, "utf8")) >>> 0;

    const encodedDomain = encodeDomainDnsLike(domain);

    const message = beginCell()
        .storeUint(0x75569022, 32)
        .storeUint(schemaHash, 32)
        .storeUint(timestamp, 64)
        .storeAddress(parsedAddress)
        .storeStringRefTail(encodedDomain.toString("utf8"))
        .storeRef(cell)
        .endCell();

    const hash = message.hash();

    return Buffer.from(hash);
}

function encodeDomainDnsLike(domain)
{
    const parts = domain.split(".").reverse();
    const encoded = [];

    for (const part of parts)
    {
        for (let i = 0; i < part.length; i++)
        {
            encoded.push(part.charCodeAt(i));
        }

        encoded.push(0);
    }

    return Buffer.from(encoded);
}

function parseHexOrBase64PublicKey(publicKey)
{
    if (typeof publicKey !== "string")
    {
        throw new Error("Invalid public key type");
    }

    if (/^[0-9a-fA-F]{64}$/.test(publicKey))
    {
        return Buffer.from(publicKey, 'hex');
    }

    return Buffer.from(publicKey, 'base64');
}

module.exports =
{
    verifySignedData
}