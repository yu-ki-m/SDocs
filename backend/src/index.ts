import * as dotenv from 'dotenv'
dotenv.config()

import Env from './EnvMananger'
import HttpServer from './HttpServer';
import knex,{ Knex } from 'knex'
import getDbConfig from '../knexfile';
import HttpRoutes from './HttpRoutes'
import express, { Express } from 'express';
import Logger, { LoggerInterface } from './Logger';


const env = new Env(process.env);
const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);
const knexFile = getDbConfig();
const db: Knex = knex(knexFile);
const app: Express = express();

const httpRoutes = new HttpRoutes(app,env,db,logger);
const server = new HttpServer(app,env,httpRoutes,logger);
server.setup();
server.start();

