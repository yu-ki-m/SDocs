
import { TemplateSummaryRepositoryInterface } from '../TemplateSummary.Repository'
import { TemplateSummaryModelInterface } from '../TemplateSummary.Model'
import TemplateSummaryResponse ,{ TemplateSummaryResponseInterface } from '../TemplateSummary.Response'

export interface TemplateSummaryServiceInterface {
    getTemplateSummaries:  () => Promise<TemplateSummaryModelInterface[]>;
}

export class TemplateSummaryService implements TemplateSummaryServiceInterface {

    templateSummaryRepository:TemplateSummaryRepositoryInterface

    constructor(templateSummaryRepository:TemplateSummaryRepositoryInterface) {
        this.templateSummaryRepository = templateSummaryRepository
    }
    getTemplateSummaries = async (): Promise<TemplateSummaryResponseInterface[]> => {
        const templateSummaries: TemplateSummaryModelInterface[] = await this.templateSummaryRepository.getAll();
        const templateSummariesResponse: TemplateSummaryResponseInterface[] = templateSummaries.map((templateSummary:TemplateSummaryModelInterface)=>{
            return new TemplateSummaryResponse(templateSummary.id,templateSummary.viewName,templateSummary.path,templateSummary.describe,templateSummary.tags)
        });
        return templateSummariesResponse;
    }
}


