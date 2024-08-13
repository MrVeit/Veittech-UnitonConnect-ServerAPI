const time = require('./timeUtils');

const express = require('express');
const axios = require('axios');
const sharp = require('sharp');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST;

function getImageNameFromUrl(url) 
{
    return url.substring(url.lastIndexOf('/') + 1);
}

app.get('/get-nft-image', async (request, result) =>
{
    const { url } = request.query;

    if (!url)
    {
        return result.status(400).send('The URL of the server to download the image is required');
    }

    try
    {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        const contentType = response.headers['content-type'];
        
        if (contentType === "image/webp")
        {
            const image = sharp(response.data);
            const originalMetadata = await image.metadata();

            console.log(`[${time.timestamp}] Original image metadata: ${JSON.stringify(originalMetadata)}`);

            image.toFormat('jpeg', { quality: 100 });

            result.set('Content-Type', 'image/jpeg');

            const buffer = await image.toBuffer();
            const newMetadata = await sharp(buffer).metadata();

            console.log(`[${time.timestamp}] Converted image metadata: ${JSON.stringify(newMetadata)}`);

            result.send(buffer);    

            console.log(`[${time.timestamp}] The image ${getImageNameFromUrl(url)} was converted to jpeg format and sent to the game client.`);
        }
        else
        {
            result.set('Content-Type', contentType);

            result.send(response.data);

            console.log(`[${time.timestamp}] The image ${getImageNameFromUrl(url)} was not in webp format, so it was sent to the game client unchanged.`);
        }
    }
    catch (error)
    {
        console.error(error);
        result.status(500).send('Failed to fetch image');
    }
});

app.listen(port, () =>
{
   console.log(`[${time.timestamp}] API Server listening at ${host}${port}`); 
});