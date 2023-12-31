/**
 * @vitest-environment jsdom
 */
import { TemplateContentsRepository } from './index'
import { TemplateContentsResponseInterface } from '../TemplateContents.Response'
import { TemplateContentsInterface } from '../TemplateContents'
import { describe, it, expect } from 'vitest'
import { templateContentsA } from '../../../__tests__/__fixtures__/TemplateContents'
import { templateContentsResponseA } from '../../../__tests__/__fixtures__/TemplateContentsResponse'
import StubHttpClient from '../../http/HttpClient/stubHttpClient'
import HttpResponse from '../../http/HttpResponse/index'
import { EMPTY_CONTENTS } from './const'

describe('get', () => {
    it('空のテンプレート内容を取得する', async () => {
        // * Arrage
        const stubHttpClient = new StubHttpClient()
        stubHttpClient.get_returnValue = new HttpResponse<TemplateContentsResponseInterface>(
            200,
            'OK',
            templateContentsResponseA
        )

        const targetTemplateContentsRepository = new TemplateContentsRepository(stubHttpClient)
        const expectedTemplateContents: TemplateContentsInterface[] = EMPTY_CONTENTS

        // * Act
        const actualTemplateContentsList = await targetTemplateContentsRepository.get('new-create')

        // * Assert
        expect(actualTemplateContentsList).toEqual(expectedTemplateContents)
        expect(stubHttpClient.get_wasCalled).toBe(false)
    })
    it('テンプレート内容を取得する', async () => {
        // * Arrage
        const stubHttpClient = new StubHttpClient()
        stubHttpClient.get_returnValue = new HttpResponse<TemplateContentsResponseInterface>(
            200,
            'OK',
            templateContentsResponseA
        )

        const targetTemplateContentsRepository = new TemplateContentsRepository(stubHttpClient)
        const expectedTemplateContents: TemplateContentsInterface[] = structuredClone(templateContentsA)

        // * Act
        const actualTemplateContentsList = await targetTemplateContentsRepository.get('templateContents-searchKey')

        // * Assert
        expect(actualTemplateContentsList).toEqual(expectedTemplateContents)
        expect(stubHttpClient.get_wasCalled).toBe(true)
        expect(stubHttpClient.get_actualUrl).toBe('/template-contents/templateContents-searchKey')
    })
})
