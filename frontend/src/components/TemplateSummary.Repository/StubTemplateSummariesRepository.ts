import { TemplateInterface, Template } from "../Template.Entity";
import { TemplateSummaryInterface } from "../TemplateSummary.Entity";
import {  TemplateSummariesRepositoryInterface } from "./index";
export class StubTemplateSummariesRepository implements TemplateSummariesRepositoryInterface {


    get_wasCalled = false
    get_returnValue: TemplateInterface = new Template('stub default value','stub default value', 'stub default value', 'stub default value', 'stub default value');
    get_actualId: string = '';
    async get(id: string): Promise<TemplateInterface> {
        this.get_wasCalled = true;
        this.get_actualId = id;
        return this.get_returnValue;
    }


    getAll_wasCalled = false
    getAll_returnValue: TemplateSummaryInterface[] = []
    async getAll(): Promise<TemplateSummaryInterface[]> {
        this.getAll_wasCalled = true;
        return this.getAll_returnValue;
    }

}


