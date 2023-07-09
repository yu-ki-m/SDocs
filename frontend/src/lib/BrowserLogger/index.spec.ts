/**
 * @vitest-environment jsdom
 */
import { describe, it, expect,vi } from 'vitest'
import { BrowserLogger } from '../BrowserLogger/index'
// console.logのインターフェースをインポート

describe("console.log",() => {
    it('messageがconsole.logに渡されること',  async () => {
        // * Arrage

        let actualLog: any = "";
        const mockLog :Console["log"] = (message?: any, ...optionalParams: any[])=> {
            actualLog = message;
        }

        vi.spyOn(console, "log").mockImplementation(mockLog);

        const testLogMessage:string = "testLog";
        
        // * Act
        BrowserLogger.log(testLogMessage);
        
        // * Assert
        expect(actualLog).toBe(testLogMessage);
    })
    it('messageがconsole.warnに渡されること',  async () => {
        // * Arrage

        let actualWarn: any = "";
        const mockWarn :Console["warn"] = (message?: any, ...optionalParams: any[])=> {
            actualWarn = message;
        }

        vi.spyOn(console, "warn").mockImplementation(mockWarn);

        const testLogMessage:string = "testWarn";
        
        // * Act
        BrowserLogger.warn(testLogMessage);
        
        // * Assert
        expect(actualWarn).toBe(testLogMessage);
    })
    it('messageがconsole.errorに渡されること',  async () => {
        // * Arrage

        let actualError: any = "";
        const mockError :Console["error"] = (message?: any, ...optionalParams: any[])=> {
            actualError = message;
        }

        vi.spyOn(console, "error").mockImplementation(mockError);

        const testLogMessage:string = "testError";
        
        // * Act
        BrowserLogger.error(testLogMessage);
        
        // * Assert
        expect(actualError).toBe(testLogMessage);
    })
})
