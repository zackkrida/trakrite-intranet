const app = require('express')()

import config from './config'
import { postgraphile } from 'postgraphile'

app
  .use(postgraphile(config.db, config.db.schemas, config.pg))
  .listen(config.port, () =>
    // eslint-disable-next-line
    console.info(
      `> GraphQL Server started at http://localhost:${config.port}/graphql using db ${config.db.database}`,
      config.pg.graphiql &&
        `\n> GraphiQL ready at http://localhost:${config.port}/graphiql`
    )
  )
