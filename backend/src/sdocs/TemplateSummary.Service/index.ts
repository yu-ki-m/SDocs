
import { TemplateSummaryRepositoryInterface } from '../TemplateSummary.Repository'
import { TemplateSummaryInterface } from '../TemplateSummary'
import TemplateSummaryResponse ,{ TemplateSummaryResponseInterface } from '../TemplateSummary.Response'

export interface TemplateSummaryServiceInterface {
    getTemplateSummaries:  () => Promise<TemplateSummaryResponseInterface>;
}

export class TemplateSummaryService implements TemplateSummaryServiceInterface {

    templateSummaryRepository:TemplateSummaryRepositoryInterface

    constructor(templateSummaryRepository:TemplateSummaryRepositoryInterface) {
        this.templateSummaryRepository = templateSummaryRepository
    }
    getTemplateSummaries = async (): Promise<TemplateSummaryResponseInterface> => {
        const templateSummaries: TemplateSummaryInterface[] = await this.templateSummaryRepository.getAll();
        const templateSummariesResponse: TemplateSummaryResponseInterface = new TemplateSummaryResponse(templateSummaries)
        return templateSummariesResponse;
    }
}


