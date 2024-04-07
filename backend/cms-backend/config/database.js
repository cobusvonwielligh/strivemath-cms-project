const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT');

  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL'),
      },
      // pool: { min: env.int('DATABASE_POOL_MIN', 1), max: env.int('DATABASE_POOL_MAX', 50) },
      // acquireConnectionTimeout: 1000000,
      // acquireTimeoutMillis: 300000,
      // createTimeoutMillis: 300000,
      // destroyTimeoutMillis: 300000,
      // idleTimeoutMillis: 30000,
      // reapIntervalMillis:1000,
      // createRetryIntervalMillis: 2000
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
