import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import pino from 'pino';

dotenv.config();
export const logger = pino({ level: 'trace' });

const app = express();

app.use(compression());
app.use(helmet())
app.use(express.json());

import transactions from './modules/transactions';

const apiRouter = Router();
apiRouter.use(transactions)

const v1Router = Router();
v1Router.use('/deel/v1', apiRouter);

app.use(v1Router);

export default app;