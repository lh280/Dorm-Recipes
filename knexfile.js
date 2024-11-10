/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

const dev = process.env.NODE_ENV !== "production";
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DATABASE_URL } =
  loadEnvConfig("./", dev).combinedEnv;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
