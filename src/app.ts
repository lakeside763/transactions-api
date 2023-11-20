import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import pino from 'pino';
const v1Router = Router();
const router = Router();

dotenv.config();
export const logger = pino({ level: 'trace' });

const app = express();

app.use(compression());
app.use(helmet())
app.use(express.json());

v1Router.use()

router.use('/deel/v1', v1Router)

export default app;