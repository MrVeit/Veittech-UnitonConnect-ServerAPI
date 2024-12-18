function getCurrentDate()
{
    return new Date();
}

function getCurrentTimestamp()
{
    return getCurrentDate().toISOString();
}

function getCurrentDay()
{
    return getCurrentDate().getDate();
}

function getCurrentMonth()
{
    return (getCurrentDate().getMonth() + 1).toString().padStart(2, '0');
}

function getUnixTime()
{
    return Math.floor(Date.now() / 1000);
}

module.exports = 
{
    getCurrentDate,
    
    getCurrentTimestamp,
    getCurrentDay,
    getCurrentMonth,
    getUnixTime
};