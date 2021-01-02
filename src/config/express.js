import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import helmet from 'helmet';
import passport from 'passport';

import routes from '../api/routes/v1/index';
import { jwtStrategy } from './passport';
import * as error from '../api/middlewares/error';

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
const logsLevel = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logsLevel));

// parse body params and attache them to req.body
app.use(bodyParser.json());

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
