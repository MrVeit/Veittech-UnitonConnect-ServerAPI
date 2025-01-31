const { getAvatarByUrl } = require('../services/extensionsService');

exports.parseAvatarByUrl = async (request, result) =>
{
    const { url } = request.query;

    try
    {
        const loadedImageData = await getAvatarByUrl(url);

        result.set('Content-Type', loadedImageData.currentContent);
        
        result.send(loadedImageData.loadedImage);
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