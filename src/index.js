import './config/env';
import('./config/socket');

import './config/socket';

import app from './config/express';
import logger from './config/logger';

const port = process.env.PORT;
const env = process.env.NODE_ENV;
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
