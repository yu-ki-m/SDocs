import { TemplateContentsRepository } from "./index";
import { TemplateContents } from "../TemplateContents";

import { record1_1, record1_2, record1_3 } from '../../../../seeds/development/20230715201100_insert_template_contents'

import knex, { Knex } from "knex";
import Server from "../../../HttpServer";


import express, { Express } from 'express';
import Env from "../../../EnvMananger";

import HttpRoutes from "../../../HttpRoutes";
import getDbConfig from  '../../../../knexfile';
import SDocsLogger, { SDocsLoggerInterface, createLogger } from "../../../SDocsLogger";
import { getLogConfig } from "../../../../logger.config";
const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));
const knexFile = getDbConfig();
const db: Knex = knex(knexFile);
let server: Server | null = null;

describe("byId", () => {
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

  it("テンプレート内容を取得する", async () => {
    // * Arrage
    const targetTemplateContentsRepository = new TemplateContentsRepository(db);

    // * Act
    const actualTemplateContents: TemplateContents[] = await targetTemplateContentsRepository.byId("279f24d3-3a27-4376-8ced-9dd9398adc86");

    // * Assert
    expect(actualTemplateContents).toEqual([record1_1,record1_2,record1_3 ]);


  })

})
