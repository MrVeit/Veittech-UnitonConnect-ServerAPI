const logger = require('../utils/logger');

const axios = require('axios');
const express = require('express');
const sharp = require('sharp');
const router = express.Router();

router.get('/assets/item-icon', async (request, result) =>
{
    const { url } = request.query;

    if (!url)
    {
        return result.status(400).send(`The URL of the server` +
            `to download the image is required`);
    }

    try
    {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        const contentType = response.headers['content-type'];
        
        if (contentType === "image/webp")
        {
            const image = sharp(response.data);
            const originalMetadata = await image.metadata();

            logger.message(`Original image metadata: ${JSON.stringify(originalMetadata)}`);

            image.toFormat('jpeg', { quality: 100 });

            result.set('Content-Type', 'image/jpeg');

            const buffer = await image.toBuffer();
            const newMetadata = await sharp(buffer).metadata();

            logger.message(`Converted image metadata: ${JSON.stringify(newMetadata)}`);

            result.send(buffer);    

            logger.message(`The image ${getImageNameFromUrl(url)} was converted` +
               `to jpeg format and sent to the game client.`);
        }
        else
        {
            result.set('Content-Type', contentType);

            result.send(response.data);

            logger.message(`The image ${getImageNameFromUrl(url)} was not in webp format, ` +
                `so it was sent to the game client unchanged.`);
        }
    }
    catch (error)
    {
        logger.error(error);

        result.status(500).send('Failed to fetch image');
    }
});

function getImageNameFromUrl(url) 
{
    return url.substring(url.lastIndexOf('/') + 1);
}

module.exports = router;