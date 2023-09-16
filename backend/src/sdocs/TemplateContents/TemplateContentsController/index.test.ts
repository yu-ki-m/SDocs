import request from "supertest";

import knex, { Knex } from "knex";
import getDbConfig from "../../../../knexfile";
import express, { Express } from 'express';
import Env from "../../../EnvMananger";
import HttpRoutes from "../../../HttpRoutes";
import Server from "../../../HttpServer";
import { record1_1, record1_2,record1_3  } from '../../../../seeds/development/20230715201100_insert_template_contents'

import SDocsLogger, { SDocsLoggerInterface , createLogger} from "../../../SDocsLogger";
import { getLogConfig } from "../../../../logger.config";

const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));
const knexFile = getDbConfig();

const db: Knex = knex(knexFile);
let server: Server | null = null;

describe("index", () => {
  beforeEach(async () => {
    await db.migrate.latest();
    await db.seed.run();
    const app: Express = express();
    const env = new Env(process.env);
    const httpRoutes = new HttpRoutes(app,env,db,logger);
    server = new Server(app,env,httpRoutes,logger);
    server.setup();
  });
  afterEach(async () => {
    await db.migrate.rollback();
  });
  afterAll(async () => {
    await db.destroy();
  });

  describe("/api/template-contents/{id}", () => {
    test("テンプレート内容が取得できること", async () => {


      return await request(server?.app)
        .get("/api/template-contents/279f24d3-3a27-4376-8ced-9dd9398adc86")
        .then((response) => {
          expect(response.body).toEqual( {"templateContentsList":[record1_1, record1_2,record1_3 ] } );
          expect(response.statusCode).toBe(200);
        })
    })

  })
})
