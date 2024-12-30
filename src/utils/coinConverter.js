const { toNano, fromNano } = require('@ton/core');

function toNanoton(amount)
{
    return toNano(amount);
}

function fromNanoton(nanoAmount)
{
    return fromNano(nanoAmount);
}

function toUSDtNanoton(amount)
{
    return Math.floor(amount * 1e6);
}

function fromUSDtNanoton(nanoAmount)
{
    return nanoAmount / 1e6;
}

module.exports =
{
    toNanoton,
    fromNanoton,
    toUSDtNanoton,
    fromUSDtNanoton
};