import dotenv from 'dotenv'
dotenv.config()

import Env from './EnvMananger'
import HttpServer from './HttpServer';
import knex,{ Knex } from 'knex'
import getDbConfig from '../knexfile';
import HttpRoutes from './HttpRoutes'
import express, { Express } from 'express';
import SDocsLogger, { SDocsLoggerInterface, createLogger } from './SDocsLogger';
import { getLogConfig } from '../logger.config'


const env = new Env(process.env);


const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));
const knexFile = getDbConfig();
const db: Knex = knex(knexFile);
const app: Express = express();

const httpRoutes = new HttpRoutes(app,env,db,logger);
const server = new HttpServer(app,env,httpRoutes,logger);
server.setup();
server.start();

