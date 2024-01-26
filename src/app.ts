import * as dotenv from 'dotenv';
import express, { Request, Response, Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import pino from 'pino';

dotenv.config()
export const logger = pino({ level: 'trace' });

const app = express();
import packagejson from './../package.json';

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

app.get('/deel/v1/index', (req: Request, res: Response) => {
  res.status(200).send({ name: packagejson.name, version: packagejson.version })
})

app.use(v1Router);
app.use(middlewares.errorHandler)

export default app;