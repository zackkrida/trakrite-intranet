require('dotenv').config()

import * as FilterPlugin from 'postgraphile-plugin-connection-filter'
import * as PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector'
import { PostGraphileOptions } from 'postgraphile'
import { NodePlugin } from 'graphile-build'

const {
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_SCHEMAS = 'public',
  DB_DEFAULT_ROLE,
  JWT_SECRET,
  JWT_TYPE_ID,
  PORT = 5000,
  NODE_ENV = 'development',
} = process.env

const isProd = NODE_ENV === 'production'

const db = {
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  schemas: DB_SCHEMAS.split(','),
}

const pg: PostGraphileOptions = {
  dynamicJson: true,
  bodySizeLimit: '5MB',
  pgDefaultRole: DB_DEFAULT_ROLE,
  graphiql: !isProd,
  enableCors: !isProd,
  jwtSecret: JWT_SECRET,
  jwtPgTypeIdentifier: JWT_TYPE_ID,
  appendPlugins: [FilterPlugin, PgSimplifyInflectorPlugin],
  skipPlugins: [NodePlugin],
  enhanceGraphiql: true,
  exportGqlSchemaPath: 'schema.gql',
  enableQueryBatching: true,
  sortExport: true,
  setofFunctionsContainNulls: false,
  graphileBuildOptions: {
    connectionFilterAllowNullInput: true,
    connectionFilterRelations: true,
  },
}

const config = {
  pg,
  db,
  isProd,
  port: PORT,
}

export default config
