import './config/env';
console.log('JWT_SECRET', process.env.JWT_SECRET);

import app from './config/express';
import logger from './config/logger';

const port = process.env.PORT;
const env = process.env.NODE_ENV;
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
