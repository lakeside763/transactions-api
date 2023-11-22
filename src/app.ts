import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import pino from 'pino';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test.local' : '.env' });
export const logger = pino({ level: 'trace' });

const app = express();

app.use(compression());
app.use(helmet())
app.use(express.json());

import transactions from './modules/transactions';
import admin from './modules/admin';
import middlewares from './middlewares';

const apiRouter = Router();
apiRouter.use(transactions)
apiRouter.use(admin);

const v1Router = Router();
v1Router.use('/deel/v1', apiRouter);

app.use(v1Router);
app.use(middlewares.errorHandler)

export default app;