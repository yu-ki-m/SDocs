
import { LocationQuery } from 'vue-router';
import { RouterWrapperInterface } from './index';

export class MockRouterWrapper implements RouterWrapperInterface {
    
    
    calledGetQuery:boolean = false;
    getQuery_returnValue: LocationQuery  =  {};
    getQuery(): LocationQuery {
        this.calledGetQuery = true;
        return this.getQuery_returnValue;
    }

    calledToTopPage:boolean = false;
    toTopPage(): void {
        this.calledToTopPage = true;
    }

    calledToEditorPage:boolean = false;
    toEditorPage_actualTemplate: string  =  "";
    toEditorPage(template: string): void {
        this.calledToEditorPage = true;
        this.toEditorPage_actualTemplate = template
    }

}