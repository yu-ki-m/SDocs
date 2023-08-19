
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import Env, { ENV_KEY,EnvInterface } from './src/EnvMananger'
import  SDocsLogger, { SDocsLoggerInterface ,createLogger } from './src/SDocsLogger';
import { EXCEPTION_MESSAGE } from './src/Message'
import { getLogConfig } from './logger.config'
import { Knex } from 'knex';


const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));

const getDbConfig = ():Knex.Config => {

    const env:EnvInterface = new Env(process.env);
    env.checkAllEnvSet();
    const nodeEnv:string    = env.get(ENV_KEY.NODE_ENV);
    const dbClient:string   = env.get(ENV_KEY.DB_CLIENT);
    const dbHost:string     = env.get(ENV_KEY.DB_HOST);
    const dbPort:number     = Number.parseInt(env.get(ENV_KEY.DB_PORT));
    const dbDatabase:string = env.get(ENV_KEY.DB_DATABASE);
    const dbUser:string     = env.get(ENV_KEY.DB_USER);
    const dbPassword:string = env.get(ENV_KEY.DB_PASSWORD);
    const dbPoolMin:number  = Number.parseInt(env.get(ENV_KEY.DB_POOL_MIN));
    const dbPoolMax:number  = Number.parseInt(env.get(ENV_KEY.DB_POOL_MAX));

    logger.knexNodeEnvLog(nodeEnv);
    if (nodeEnv === "development") {
        return {
            client: dbClient,
            connection: {
                host: dbHost,
                port: dbPort,
                database: dbDatabase,
                user:     dbUser,
                password: dbPassword
            },
            pool: {
                min: dbPoolMin,
                max: dbPoolMax
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: './migrations/development'
            },
            seeds: {
                directory: './seeds/development'
            }
        }
    }else if (nodeEnv === "production") {
        return {
            client: dbClient,
            connection: {
                host: dbHost,
                port: dbPort,
                database: dbDatabase,
                user:     dbUser,
                password: dbPassword
            },
            pool: {
                min: dbPoolMin,
                max: dbPoolMax
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: './migrations/production'
            },
            seeds: {
                directory: './seeds/production'
            }
        }
    }else if (nodeEnv === "test") {
        return {
            client: "sqlite3",
            connection: ":memory:",
            useNullAsDefault: true,
            migrations: {
                tableName: 'knex_migrations',
                directory: './migrations/development'
            },
            seeds: {
                directory: './seeds/development'
            }
        }
    }else{
      throw new Error(EXCEPTION_MESSAGE.KNEX_NODE_ENV_ERROR(nodeEnv));
    }
} 

export default getDbConfig;
