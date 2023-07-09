
import { TemplateSummaryModelInterface } from '../TemplateSummary.Model'
import { TemplateSummaryRepositoryInterface } from './index'


export class StubTemplateSummaryRepository implements TemplateSummaryRepositoryInterface {

    getAll_wasCalled = false
    getAll_returnValue: TemplateSummaryModelInterface[] = [];
    //get_actualId: string = '';

    async getAll(): Promise<TemplateSummaryModelInterface[]> {
        this.getAll_wasCalled = true;
        return this.getAll_returnValue;

    }
}

