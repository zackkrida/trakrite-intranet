"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express')();
const config_1 = require("./config");
const postgraphile_1 = require("postgraphile");
app
    .use(postgraphile_1.postgraphile(config_1.default.db, config_1.default.db.schemas, config_1.default.pg))
    .listen(config_1.default.port, () => console.info(`> GraphQL Server started at http://localhost:${config_1.default.port}/graphql using db ${config_1.default.db.database}`, config_1.default.pg.graphiql &&
    `\n> GraphiQL ready at http://localhost:${config_1.default.port}/graphiql`));
//# sourceMappingURL=index.js.map