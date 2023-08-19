/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { RouterWrapper } from './index'
import { RouteLocationRaw, NavigationFailure, LocationQuery } from 'vue-router'
import router from '../../../router'

describe('router.push', () => {
    let actualTo: RouteLocationRaw | undefined = undefined
    let targetRouterWrapper: RouterWrapper = new RouterWrapper()
    beforeEach(() => {
        /*************** Arrange ****************/
        /* ここで、router.pushをモック化する */
        actualTo = undefined
        const mockPush = (to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> => {
            actualTo = to
            return Promise.resolve(undefined)
        }
        vi.spyOn(router, 'push').mockImplementation(mockPush)

        targetRouterWrapper = new RouterWrapper()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it.concurrent('Topに遷移すること', () => {
        /***************   Act   ****************/
        targetRouterWrapper.toTopPage()

        /*************** Assert ****************/
        expect(actualTo).toEqual({ path: '/' })
    })
    it.concurrent('Editorに遷移すること', () => {
        /***************   Act   ****************/
        targetRouterWrapper.toEditorPage('TestTemplateValue')

        /*************** Assert ****************/
        expect(actualTo).toEqual({ path: '/editor', query: { template: 'TestTemplateValue' } })
    })
    it.concurrent('query文字列が取得できること', () => {
        /*************** Arrange ****************/
        const expectedQuery: LocationQuery = { template: 'TestQueryValue' }
        router.currentRoute.value.query = expectedQuery
        /***************   Act   ****************/
        const actualQuery = targetRouterWrapper.getQuery()

        /*************** Assert ****************/
        expect(actualQuery).toEqual(expectedQuery)
    })
})
