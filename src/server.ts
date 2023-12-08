import cluster from "cluster";
import http, { Server } from 'http';
import os from 'os';
import app, { logger } from "./app";
import { sequelize } from "./models";

const numCPUs = os.cpus().length;
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
  }
}

const shutdown = async (server: Server) => {
  logger.info(`Shutting down gracefully`);
  await sequelize.close();
  server.close();
  return process.exit();
}

if (cluster.isPrimary && process.env.NODE_ENV === 'production') {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died`)
  })
} else {
  const server = http.createServer(app);
  const port = process.env.PORT;
  connectDB();

  server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  })

  process.on('SIGINT', async () => shutdown(server));
  process.on('SIGTERM', async () => shutdown(server))
}