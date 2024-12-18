const logger = require('./utils/logger');
const transactionRoutes = require('./routes/transactionHandleRoutes');
const extensionsRoutes = require('./routes/extensionRoutes');

const bodyParser = require('body-parser');
const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/uniton-connect/v1', extensionsRoutes);
app.use('/api/uniton-connect/v1', transactionRoutes);

app.listen(port, () =>
{
    if (!port)
    {
        logger.error(`Failed to read port for launch server`);

        return;
    }

    logger.message(`Uniton Connect API listening at ${port}`); 
});