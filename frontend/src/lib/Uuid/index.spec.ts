/**
 * @vitest-environment jsdom
 */
import { Uuid, UuidInterface } from './index'
import { describe, it, expect,vi } from 'vitest'

describe("Uuid",() => {
    it('100,000個生成したIDが全てユニークであること',  async () => {
        // * Arrage
        const uuidCreator:UuidInterface = new Uuid();
        let actual:string[] = [];
        
        // * Act
        for(let i = 0; i < 100000; i++){
            actual.push(uuidCreator.getUniquId());
        }

        // * Assert
        expect(actual.length).toBe(100000);
        expect(actual.length).toBe(new Set(actual).size);

        
    })
})
