import request from "supertest";

import knex, { Knex } from "knex";
import getDbConfig from "../../../knexfile";
import express, { Express } from 'express';
import Env from "../../EnvMananger";
import HttpRoutes from "../../HttpRoutes";
import Server from "../../HttpServer";

import TemplateSummaryModel from "../TemplateSummary.Model";
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary";
import Logger, { LoggerInterface } from "../../Logger";

const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);
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
    await db.destroy();
  });


  describe("/api/template-summaries", () => {
    test("テンプレートサマリの一覧が取得できること", async () => {
      const templateSummaries: TemplateSummaryModel[] = templateSummariesA;

      return await request(server?.app)
        .get("/api/template-summaries")
        .then((response) => {
          expect(response.body).toEqual(templateSummaries);
          expect(response.statusCode).toBe(200);
        });
    });
  });
});
