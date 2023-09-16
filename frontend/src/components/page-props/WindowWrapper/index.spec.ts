/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { WindowWrapper } from './index'
describe('window.open', () => {
    it('新しいタブでTopへ遷移する', () => {
        // * Arrage

        /* ここで、window.openをモック化する */
        let actualUrl: string | URL | undefined = undefined
        let actualTarget: string | undefined = undefined
        const mockOpen = (
            url?: string | URL | undefined,
            target?: string | undefined,
            features?: string | undefined // eslint-disable-line
        ) => {
            actualUrl = url
            actualTarget = target
            return null
        }
        window.open = vi.fn().mockImplementation(mockOpen)

        /* WindowWrapper（テスト対象）をインスタンス化 */
        const targetWindowWrapper = new WindowWrapper()

        // * Act
        targetWindowWrapper.toTopNewTab()

        // * Assert
        expect(actualUrl).toBe('./')
        expect(actualTarget).toBe('_blank')
    })
})
