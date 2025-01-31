const time = require('./timer');

function message(text)
{
    timestamp = time.getCurrentTimestamp();

    console.error(`[${timestamp}] \x1b[32m[DEBUG] ${text}\x1b[0m`);
}

function warning(text)
{
    timestamp = time.getCurrentTimestamp();

    console.error(`[${timestamp}] \x1b[33m[WARN] ${text}\x1b[0m`);
}

function error(text)
{
    timestamp = time.getCurrentTimestamp();

    console.error(`[${timestamp}] \x1b[31m[ERROR] ${text}\x1b[0m`);
}

function detailedError(text, error)
{
    timestamp = time.getCurrentTimestamp();

    console.error(`[${timestamp}] \x1b[31m[ERROR] ${text}\x1b[0m`, error);
}

function serverError(result, errorText, message)
{
    error(time.getCurrentTimestamp(), `${message}`, errorText);

    result.status(500).json(
    {
        isSuccess: false,
        message: "Internal server error"
    })
}

module.exports =
{
    serverError,
    detailedError,

    message,
    warning,
    error,
};