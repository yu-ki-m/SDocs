/**
 * @vitest-environment jsdom
 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

import { describe, it, expect, vi } from 'vitest'
import { BrowserLogger } from './index'
// console.logのインターフェースをインポート

describe('console.log', () => {
    it('messageがconsole.logに渡されること', async () => {
        // * Arrage

        let actualLog: any = ''
        let actualOptionalParams: any[] = []
        const mockLog: Console['log'] = (message?: any, ...optionalParams: any[]) => {
            actualLog = message
            actualOptionalParams = optionalParams
        }

        vi.spyOn(console, 'log').mockImplementation(mockLog)

        const testLogMessage: string = 'testLog'

        // * Act
        BrowserLogger.log(testLogMessage)

        // * Assert
        expect(actualLog).toBe(testLogMessage)
        expect(actualOptionalParams).toEqual([])
    })
    it('messageがconsole.warnに渡されること', async () => {
        // * Arrage
        let actualWarn: any = ''
        let actualOptionalParams: any[] = []
        const mockWarn: Console['warn'] = (message?: any, ...optionalParams: any[]) => {
            actualWarn = message
            actualOptionalParams = optionalParams
        }

        vi.spyOn(console, 'warn').mockImplementation(mockWarn)

        const testLogMessage: string = 'testWarn'

        // * Act
        BrowserLogger.warn(testLogMessage)

        // * Assert
        expect(actualWarn).toBe(testLogMessage)
        expect(actualOptionalParams).toEqual([])
    })
    it('messageがconsole.errorに渡されること', async () => {
        // * Arrage
        let actualError: any = ''
        let actualOptionalParams: any[] = []
        const mockError: Console['error'] = (message?: any, ...optionalParams: any[]) => {
            actualError = message
            actualOptionalParams = optionalParams
        }

        vi.spyOn(console, 'error').mockImplementation(mockError)

        const testLogMessage: string = 'testError'

        // * Act
        BrowserLogger.error(testLogMessage)

        // * Assert
        expect(actualError).toBe(testLogMessage)
        expect(actualOptionalParams).toEqual([])
    })
})
