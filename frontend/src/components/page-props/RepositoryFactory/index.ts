import { TemplateSummariesRepositoryInterface } from '../../sdocs/TemplateSummary.Repository'
import { TemplateContentsRepositoryInterface } from '../../sdocs/TemplateContents.Repository'
export interface RepositoryFactoryInterface {
    templateSummaryRepository: TemplateSummariesRepositoryInterface
    templateContentsRepository: TemplateContentsRepositoryInterface
}

export class RepositoryFactory implements RepositoryFactoryInterface {
    templateSummaryRepository: TemplateSummariesRepositoryInterface
    templateContentsRepository: TemplateContentsRepositoryInterface

    constructor(
        templateSummaryRepository: TemplateSummariesRepositoryInterface,
        templateContentsRepository: TemplateContentsRepositoryInterface
    ) {
        this.templateSummaryRepository = templateSummaryRepository
        this.templateContentsRepository = templateContentsRepository
    }
}
