import { HttpInterface } from '../../http/HttpClient/index'
import { TemplateContentsResponseInterface } from '../TemplateContents.Response'
import { TemplateContentsInterface } from '../TemplateContents'

export interface TemplateContentsRepositoryInterface {
    get(id: string): Promise<TemplateContentsInterface[]>
}

export class TemplateContentsRepository implements TemplateContentsRepositoryInterface {
    httpClient: HttpInterface
    constructor(httpClient: HttpInterface) {
        this.httpClient = httpClient
    }

    async get(id: string): Promise<TemplateContentsInterface[]> {
        const templateContentsResponseInterface = await this.httpClient.get<TemplateContentsResponseInterface>(
            `/template-contents/${id}`
        )
        const templateContentsList: TemplateContentsInterface[] =
            templateContentsResponseInterface.data.templateContentsList
        return templateContentsList
    }
}
