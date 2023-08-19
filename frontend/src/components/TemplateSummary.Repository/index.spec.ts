/**
 * @vitest-environment jsdom
 */
import { TemplateSummariesRepository } from './index'
import { TemplateSummary } from "../TemplateSummary.Entity"
import { describe, it, expect } from 'vitest'
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary"
import StubHttpClient from '../http/HttpClient/stubHttpClient'
import HttpResponse from '../http/HttpResponse/index'



describe("getAll",() => {
    it('テンプレートサマリ一覧を取得する',  async () => {
        
        // * Arrage
        const stubHttpClient = new StubHttpClient();
        stubHttpClient.get_returnValue = new HttpResponse(200,"OK",structuredClone(templateSummariesA));
        const targetTemplateSummariesRepository = new TemplateSummariesRepository(stubHttpClient);
        const expectedTemplateSummaries:TemplateSummary[] = [
            targetTemplateSummariesRepository.emptyTemplateSummary
            ,...structuredClone(templateSummariesA)
        ];

        // * Act
        const actualTemplateSummaries:TemplateSummary[] = await targetTemplateSummariesRepository.getAll();

        // * Assert
        expect(actualTemplateSummaries).toEqual(expectedTemplateSummaries)
        expect(stubHttpClient.get_wasCalled).toBe(true)
        expect(stubHttpClient.get_actualUrl).toBe('/template-summaries')
    })
})

