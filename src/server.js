const logger = require('./utils/logger');
const assetsRoutes = require('./routes/walletAsseetsRoutes');
const extensionsRoutes = require('./routes/extensionRoutes');

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// app.use(cors()); // local test only
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/uniton-connect/v1', extensionsRoutes);
app.use('/api/uniton-connect/v1', assetsRoutes);

app.listen(port, () =>
{
    if (!port)
    {
        logger.error(`Failed to read port for launch server`);

        return;
    }

    logger.message(`Uniton Connect Backend listening at ${port}`); 
});