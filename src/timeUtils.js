const timeNow = new Date();
const timestamp = timeNow.toISOString();

function getCurrentDay()
{
    return timeNow.getDate();
}

function getCurrentMonth()
{
    return (timeNow.getMonth() + 1).toString().padStart(2, '0');
}

module.exports = 
{
    timestamp,
    
    getCurrentDay,
    getCurrentMonth
};