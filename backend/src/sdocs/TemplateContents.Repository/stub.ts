
import { TemplateContentsInterface } from '../TemplateContents'
import { TemplateContentsRepositoryInterface } from './index'


export class StubTemplateContentsRepository implements TemplateContentsRepositoryInterface {

    byId_wasCalled = false;
    byId_actualId = 'TestDefault';
    byId_returnValue: TemplateContentsInterface[] = [];


    async byId(id:string): Promise<TemplateContentsInterface[]> {
        this.byId_wasCalled = true;
        this.byId_actualId = id;
        return this.byId_returnValue;
    }
}

