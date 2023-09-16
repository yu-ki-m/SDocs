
import { TemplateSummaryInterface } from '../TemplateSummary'
import { TemplateSummaryRepositoryInterface } from './index'


export class StubTemplateSummaryRepository implements TemplateSummaryRepositoryInterface {

    getAll_wasCalled = false
    getAll_returnValue: TemplateSummaryInterface[] = [];
    //get_actualId: string = '';

    async getAll(): Promise<TemplateSummaryInterface[]> {
        this.getAll_wasCalled = true;
        return this.getAll_returnValue;

    }
}

