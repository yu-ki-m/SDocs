import { HttpInterface } from '../../http/HttpClient/index'
import { TemplateContentsResponseInterface } from '../TemplateContents.Response'
import { TemplateContentsInterface } from '../TemplateContents'
import { EMPTY_CONTENTS } from './const'
import { EMPTY_TEMPLATE_SUMMARY } from '../TemplateSummary.Repository/const'

export interface TemplateContentsRepositoryInterface {
    get(id: string): Promise<TemplateContentsInterface[]>
}

export class TemplateContentsRepository implements TemplateContentsRepositoryInterface {
    httpClient: HttpInterface
    constructor(httpClient: HttpInterface) {
        this.httpClient = httpClient
    }

    async get(id: string): Promise<TemplateContentsInterface[]> {
        if (id === EMPTY_TEMPLATE_SUMMARY.templateId) {
            return EMPTY_CONTENTS
        }
        const templateContentsResponseInterface = await this.httpClient.get<TemplateContentsResponseInterface>(
            `/template-contents/${id}`
        )
        const templateContentsList: TemplateContentsInterface[] =
            templateContentsResponseInterface.data.templateContentsList
        return templateContentsList
    }
}
