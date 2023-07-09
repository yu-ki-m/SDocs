import { TemplateSummaryRepository } from "./index";
import TemplateSummaryModel from "../TemplateSummary.Model";
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary";
import knex, { Knex } from "knex";
import Server from "../../HttpServer";

import express, { Express } from 'express';
import Env from "../../EnvMananger";

import HttpRoutes from "../../HttpRoutes";
import getDbConfig from  '../../../knexfile';
import Logger, { LoggerInterface } from "../../Logger";

const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);
const knexFile = getDbConfig();
const db: Knex = knex(knexFile);
let server: Server | null = null;

describe("getAll", () => {
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

  it("テンプレートサマリ一覧を取得する", async () => {
    // * Arrage
    const targetTemplateSummariesRepository = new TemplateSummaryRepository(db);
    const expectedTemplateSummaries: TemplateSummaryModel[] = JSON.parse(JSON.stringify(templateSummariesA));

    // * Act
    const actualTemplateSummaries: TemplateSummaryModel[] = await targetTemplateSummariesRepository.getAll();

    // * Assert
    expect(actualTemplateSummaries).toEqual(expectedTemplateSummaries);
  });
});
