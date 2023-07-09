
import { Express } from "express"
import { TemplateSummaryRepository, TemplateSummaryRepositoryInterface } from "./sdocs/TemplateSummary.Repository/index"
import { TemplateSummaryService } from "./sdocs/TemplateSummary.Service/index"
import  TemplateSummaryController from "./sdocs/TemplateSummary.Controller/index"
import  { EnvInterface } from './EnvMananger';

import { Knex } from "knex"
import { LoggerInterface } from "./Logger";


export default class HttpRoutes implements HttpRoutesInterface{
    app:Express;
    env:EnvInterface;
    db:Knex;
    logger:LoggerInterface;

    constructor(app:Express, env:EnvInterface,db:Knex,logger:LoggerInterface){
        this.app = app;
        this.env = env
        this.db  = db;
        this.logger = logger;
    }

    /** パスの紐づけ<br/>
     * この関数はapp.useの後に呼び出すこと  
    */
    setupRoutes = () => {
        const templateSummaryRepository:TemplateSummaryRepositoryInterface = new TemplateSummaryRepository(this.db);
        const templateSummaryService = new TemplateSummaryService(templateSummaryRepository);
        const templateSummaryController = new TemplateSummaryController(templateSummaryService,templateSummaryRepository)
        this.app.get("/api/template-summaries", templateSummaryController.getTemplateSummaries());
    }
}

export interface HttpRoutesInterface {
    setupRoutes: (app:Express,db:Knex) => void;
}
