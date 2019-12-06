/// <reference types="node" />
import { PostGraphileOptions } from 'postgraphile';
declare const config: {
    pg: PostGraphileOptions<import("http").IncomingMessage, import("http").ServerResponse>;
    db: {
        database: string;
        user: string;
        password: string;
        host: string;
        port: number;
        schemas: string[];
    };
    isProd: boolean;
    port: string | number;
};
export default config;
//# sourceMappingURL=config.d.ts.map