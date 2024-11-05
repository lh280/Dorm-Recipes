/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

// Adapted from NextJS knex example
const dev = process.env.NODE_ENV !== "production";
const { DATABASE_URL } = loadEnvConfig("./", dev).combinedEnv;


module.exports = {

  development: {
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  }
};