/**
 * @vitest-environment jsdom
 */
import { Uuid, UuidInterface } from './index'
import { describe, it, expect } from 'vitest'

describe('Uuid', () => {
    it('1000個生成したIDが全てユニークであること', async () => {
        // * Arrage
        const uuidCreator: UuidInterface = new Uuid()
        let actual: string[] = []

        // * Act
        for (let i = 0; i < 1000; i++) {
            actual = [...actual, uuidCreator.getUniquId()]
        }

        // * Assert
        console.log(typeof Uuid)
        expect(actual.length).toBe(1000)
        expect(actual.length).toBe(new Set(actual).size)
    })
})
