/**
 * @vitest-environment jsdom
 */
import { TemplateSummariesRepository } from './index'
import { TemplateSummaryInterface } from '../TemplateSummary'
import { describe, it, expect } from 'vitest'
import { templateSummariesA } from '../../../__tests__/__fixtures__/TemplateSummary'
import { templateSummariesResponseA } from '../../../__tests__/__fixtures__/TemplateSummariesResponse'
import { TemplateSummariesResponseInterface } from '../TemplateSummary.Response'
import StubHttpClient from '../../http/HttpClient/stubHttpClient'
import HttpResponse from '../../http/HttpResponse/index'

describe('get', () => {
    it('テンプレートサマリを取得する', async () => {
        // * Arrage
        const stubHttpClient = new StubHttpClient()
        stubHttpClient.get_returnValue = new HttpResponse<TemplateSummariesResponseInterface>(
            200,
            'OK',
            templateSummariesResponseA
        )

        const targetTemplateSummariesRepository = new TemplateSummariesRepository(stubHttpClient)
        const expectedTemplateSummaries: TemplateSummaryInterface[] = structuredClone(templateSummariesA)

        // * Act
        const actualTemplateSummary: TemplateSummaryInterface = await targetTemplateSummariesRepository.get(
            'a2d501ec-1cdf-43ec-b195-4422ef8b710b'
        )

        // * Assert
        expect(actualTemplateSummary).toEqual(expectedTemplateSummaries[1])
        expect(stubHttpClient.get_wasCalled).toBe(true)
        expect(stubHttpClient.get_actualUrl).toBe('/template-summaries')
    })
})

describe('getAll', () => {
    it('テンプレートサマリ一覧を取得する', async () => {
        // * Arrage
        const stubHttpClient = new StubHttpClient()
        stubHttpClient.get_returnValue = new HttpResponse<TemplateSummariesResponseInterface>(
            200,
            'OK',
            templateSummariesResponseA
        )

        const targetTemplateSummariesRepository = new TemplateSummariesRepository(stubHttpClient)
        const expectedTemplateSummaries: TemplateSummaryInterface[] = [...structuredClone(templateSummariesA)]

        // * Act
        const actualTemplateSummaries: TemplateSummaryInterface[] = await targetTemplateSummariesRepository.getAll()

        // * Assert
        expect(actualTemplateSummaries).toEqual(expectedTemplateSummaries)
        expect(stubHttpClient.get_wasCalled).toBe(true)
        expect(stubHttpClient.get_actualUrl).toBe('/template-summaries')
    })
})
