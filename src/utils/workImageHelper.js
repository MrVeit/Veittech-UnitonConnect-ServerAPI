const logger = require('../utils/logger');

const sharp = require('sharp');

async function parseImageByUrl(contentType, response)
{
    const loadedImage = response.data;

    if (!loadedImage)
    {
        throw new Error('Image is not exist by url');
    }

    if (contentType === "image/webp" ||
        contentType === "image/svg")
    {
        const image = sharp(loadedImage);
        const oldMetadata = await image.metadata();

        logger.message(`Original image metadata: `+
            `${JSON.stringify(oldMetadata)}`);

        image.toFormat('jpeg', { quality: 100 });

        const buffer = await image.toBuffer();
        const newMetadata = await sharp(buffer).metadata();

        logger.message(`Converted image metadata: `+
            `${JSON.stringify(newMetadata)}`);

        return {
            currentContent: 'image/jpeg',
            loadedImage: buffer
        };
    }

    return {
        currentContent: contentType,
        loadedImage: loadedImage
    }
}

module.exports =
{
    parseImageByUrl,
};