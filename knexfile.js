/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

const dev = process.env.NODE_ENV !== "production";
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DATABASE_URL } =
  loadEnvConfig("./", dev).combinedEnv;

  const defaultSettings = {
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  };
  

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

  test: {
    ...defaultSettings,
    client: "pg",
    connection: async () => {
      // Only import testcontainers when running in a test environment
      const { PostgreSqlContainer } = await import(
        "@testcontainers/postgresql"
      );

      // Create a new container for each connection, i.e., for each test file
      // being run in parallel. These containers are automatically cleaned up
      // by test containers via its ryuk resource reaper.
      const container = await new PostgreSqlContainer("postgres:16").start();
      return {
        host: container.getHost(),
        port: container.getPort(),
        database: container.getDatabase(),
        user: container.getUsername(),
        password: container.getPassword(),
      };
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

};