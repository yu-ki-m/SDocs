/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { debounce } from './index'

describe('debounce', async () => {
    it('', async () => {
        // * Arrage
        const mockFn = vi.fn()
        const mockTime = 1000
        const debounceFn = debounce(mockFn, mockTime)

        // * Act
        debounceFn()
        debounceFn()
        debounceFn()
        debounceFn()

        // * Assert
        expect(mockFn).toBeCalledTimes(0)
        await new Promise((resolve) => setTimeout(resolve, mockTime + 100))
        expect(mockFn).toBeCalledTimes(1)
    })
})
