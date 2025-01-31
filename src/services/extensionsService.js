const logger = require('../utils/logger');
const { parseImageByUrl } = require('../utils/workImageHelper');

const axios = require('axios');

async function getAvatarByUrl(url)
{
    if (!url)
    {
        logger.warning(`Missing required params in client request`);

        throw new Error("Missing url in request");
    }
    
    const response = await axios.get(url,
    {
        responseType: 'arraybuffer'
    });

    const contentType = response.headers['content-type'];
    const imageData = await parseImageByUrl(contentType, response);

    if (!imageData.loadedImage)
    {
        logger.warning(`Image is not exist by url ${url}`);

        throw new Error(`Failed to load image by url: ${url}`);
    }

    logger.message(`Target image loaded by url ${url}`);

    return imageData;
}

module.exports =
{
    getAvatarByUrl,
};