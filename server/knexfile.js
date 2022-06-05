// Update with your config settings.
const path = require("path")
const envPath = path.join(__dirname, ".env")
require("dotenv").config({path: envPath});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    development: {
      client: process.env.DEV_DB_CLIENT,
      connection: process.env.DEV_DB_CONNECTION,
    },
  
    staging: {
      client: "postgresql",
      connection: {
        database: "my_db",
        user: "username",
        password: "password",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      migrations: {
        directory: path.join(__dirname, "migrations"),
      },
      seeds: {
        directory: path.join(__dirname, "seeds"),
      },
    },
  };