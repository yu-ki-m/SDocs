
import { Express } from "express"
import { TemplateSummaryRepository, TemplateSummaryRepositoryInterface } from "./sdocs/TemplateSummary.Repository"
import { TemplateSummaryService } from "./sdocs/TemplateSummary.Service"
import  TemplateSummaryController from "./sdocs/TemplateSummary.Controller"

import { TemplateContentsRepository, TemplateContentsRepositoryInterface } from "./sdocs/TemplateContents.Repository"
import { TemplateContentsService } from "./sdocs/TemplateContents.Service"
import  TemplateContentsController from "./sdocs/TemplateContents.Controller"
import  { EnvInterface } from './EnvMananger';

import { Knex } from "knex"
import { SDocsLoggerInterface } from "./SDocsLogger";


export default class HttpRoutes implements HttpRoutesInterface{
    app:Express;
    env:EnvInterface;
    db:Knex;
    logger:SDocsLoggerInterface;

    constructor(app:Express, env:EnvInterface,db:Knex,logger:SDocsLoggerInterface){
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

        const templateContentsRepository:TemplateContentsRepositoryInterface = new TemplateContentsRepository(this.db);
        const templateContentsService = new TemplateContentsService(templateContentsRepository);
        const templateContentsController = new TemplateContentsController(templateContentsService,templateContentsRepository);
        this.app.get("/api/template-contents/:id", templateContentsController.getTemplateContentsById());

    }
}

export interface HttpRoutesInterface {
    setupRoutes: (app:Express,db:Knex) => void;
}
