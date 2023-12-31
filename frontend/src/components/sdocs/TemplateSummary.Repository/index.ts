import { TemplateSummaryInterface } from '../TemplateSummary'
import { HttpInterface } from '../../http/HttpClient/index'
import { BrowserLogger } from '../../BrowserLogger'
import { TemplateSummariesResponse, TemplateSummariesResponseInterface } from '../TemplateSummary.Response'
import { EMPTY_TEMPLATE_SUMMARY } from './const'

export interface TemplateSummariesRepositoryInterface {
    getAll(): Promise<TemplateSummaryInterface[]>
    get(id: string): Promise<TemplateSummaryInterface>
}

export class TemplateSummariesRepository implements TemplateSummariesRepositoryInterface {
    httpClient: HttpInterface

    constructor(httpClient: HttpInterface) {
        this.httpClient = httpClient
    }

    async get(templateId: string): Promise<TemplateSummaryInterface> {
        // TODO: バックエンドに/template-summaries:idを実装後、個別のデータを取得する処理へ修正する
        if (templateId === EMPTY_TEMPLATE_SUMMARY.templateId) {
            return EMPTY_TEMPLATE_SUMMARY
        }
        const templateSummariesResponse =
            await this.httpClient.get<TemplateSummariesResponseInterface>('/template-summaries')
        const templateSummary = templateSummariesResponse.data.templateSummaries.find(
            (templateSummary) => templateSummary.templateId === templateId
        )
        if (!templateSummary) {
            throw new Error('TemplateSummary が見つかりませんでした')
        }
        return templateSummary
    }

    async getAll(): Promise<TemplateSummaryInterface[]> {
        let templateSummariesEntity: TemplateSummariesResponseInterface = new TemplateSummariesResponse([])
        try {
            const templateSummariesResponse =
                await this.httpClient.get<TemplateSummariesResponseInterface>('/template-summaries')
            templateSummariesEntity = new TemplateSummariesResponse(templateSummariesResponse.data.templateSummaries)
        } catch (e) {
            if (e instanceof Error) {
                BrowserLogger.error(e.message)
            } else {
                BrowserLogger.error('Unknown Error')
            }
        }

        const templateSummaries: TemplateSummaryInterface[] = [
            EMPTY_TEMPLATE_SUMMARY,
            ...(templateSummariesEntity.templateSummaries || [])
        ]

        return templateSummaries
    }
}
