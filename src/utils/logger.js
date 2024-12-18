const time = require('./timer');

function serverError(result, errorText, message)
{
    error(time.getCurrentTimestamp(), `${message}`, errorText);

    result.status(500).json(
    {
        isSuccess: false,
        message: "Internal server error"
    })
}

function message(text)
{
    var timestamp = time.getCurrentTimestamp();

    console.log(`[${timestamp}] ${text}`);
}

function warning(text)
{
    var timestamp = time.getCurrentTimestamp();

    console.warn(`[${timestamp}] ${text}`);
}

function error(text)
{
    var timestamp = time.getCurrentTimestamp();

    console.error(`[${timestamp}] ${text}`);
}

module.exports =
{
    serverError,

    message,
    warning,
    error,
    error,
};