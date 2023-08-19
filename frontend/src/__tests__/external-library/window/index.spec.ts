/**
 * @vitest-environment jsdom
 */
import { describe, it, expect,vi ,afterEach} from 'vitest'
describe("window.open",() => {

    it('windows.openのインターフェースが定義通りであること',  () => {
        //* Arrage
        let actualUrl:string|URL|undefined = undefined;
        let actualTarget:string | undefined = undefined;
        let actualFeatures:string | undefined = undefined;

        const mockOpen = (url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): WindowProxy | null=> {
            actualUrl = url;
            actualTarget = target;
            actualFeatures = features;
            return null;
        }
        vi.spyOn(window, "open").mockImplementation(mockOpen);
        //* Act
        window.open("urlTest","targetTest","featuresTest");

        //* Assert
        expect(actualUrl).toBe("urlTest");
        expect(actualTarget).toBe("targetTest");
        expect(actualFeatures).toBe("featuresTest");

        
    })

})