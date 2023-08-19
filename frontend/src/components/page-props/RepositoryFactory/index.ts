import { TemplateSummariesRepositoryInterface } from "../../TemplateSummary.Repository";

export interface RepositoryFactoryInterface{
    templateSummaryRepository: TemplateSummariesRepositoryInterface; 
}

export class RepositoryFactory implements RepositoryFactoryInterface{
    templateSummaryRepository: TemplateSummariesRepositoryInterface; 

    constructor(templateSummaryRepository: TemplateSummariesRepositoryInterface){
        this.templateSummaryRepository = templateSummaryRepository ;
    }
}