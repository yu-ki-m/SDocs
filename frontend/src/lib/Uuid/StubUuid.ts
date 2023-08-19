import { Uuid, UuidInterface } from '.';

// stubの定義
export class StubUuid implements UuidInterface {

    getUniquId_wasCalled = false
    getUniquId_returnValue: string = 'stub default value';

    getUniquId(): string {
        this.getUniquId_wasCalled = true;
        return this. getUniquId_returnValue;
    }
    
}