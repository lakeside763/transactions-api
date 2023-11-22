require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    modelsDir: "src/models",
    migrationsDir: "src/migrations",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "deel_dev_test",
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    modelsDir: "src/models",
    migrationsDir: "src/migrations",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
}
