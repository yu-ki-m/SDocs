import { v4 as uuid } from 'uuid';

export interface UuidInterface {
    getUniquId():string;
}

export class Uuid implements UuidInterface {
    constructor() {}

    getUniquId():string{
        return uuid();
    }
}
