
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import Env, { ENV_KEY,EnvInterface } from './src/EnvMananger'
import  Logger, { LoggerInterface } from './src/Logger';
import { EXCEPTION_MESSAGE } from './src/Message'

const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);

const getDbConfig = () => {

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
                directory: './migrations/develop'
            },
            seeds: {
                directory: './seeds/develop'
            }
        }
    }else if (env.get(ENV_KEY.NODE_ENV) === "production") {
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
    }else if (env.get(ENV_KEY.NODE_ENV) === "unittest") {
        return {
            client: "sqlite3",
            connection: ":memory:",
            useNullAsDefault: true,
            migrations: {
                tableName: 'knex_migrations',
                directory: './migrations/develop'
            },
            seeds: {
                directory: './seeds/develop'
            }
        }
    }else{
      throw new Error(EXCEPTION_MESSAGE.KNEX_NODE_ENV_ERROR(nodeEnv));
    }
} 

export default getDbConfig;
