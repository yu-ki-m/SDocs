import { TemplateSummaryRepository } from "./index";
import {TemplateSummary} from "../TemplateSummary";
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary";
import knex, { Knex } from "knex";
import Server from "../../HttpServer";

import express, { Express } from 'express';
import Env from "../../EnvMananger";

import HttpRoutes from "../../HttpRoutes";
import getDbConfig from  '../../../knexfile';
import SDocsLogger, { SDocsLoggerInterface , createLogger } from "../../SDocsLogger";
import { getLogConfig } from "../../../logger.config";

const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));
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
    await db.migrate.rollback();
  });
  afterAll(async () => {
    await db.destroy();
  });

  it("テンプレートサマリ一覧を取得する", async () => {
    // * Arrage
    const targetTemplateSummariesRepository = new TemplateSummaryRepository(db);
    const expectedTemplateSummaries: TemplateSummary[] = JSON.parse(JSON.stringify(templateSummariesA));

    // * Act
    const actualTemplateSummaries: TemplateSummary[] = await targetTemplateSummariesRepository.getAll();

    // * Assert
    expect(actualTemplateSummaries).toEqual(expectedTemplateSummaries);
  })
})
