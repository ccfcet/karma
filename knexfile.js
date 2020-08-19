require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: process.env.POSTGRES_HOST_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    debug: true,
  },
};
