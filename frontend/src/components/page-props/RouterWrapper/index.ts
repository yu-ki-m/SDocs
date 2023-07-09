import { LocationQuery,  Router } from 'vue-router'
import router ,{ PATHS }  from '../../../router';
export interface RouterWrapperInterface {
    toTopPage(): void;
    getQuery() :LocationQuery;
    toEditorPage(template: string): void;
}

export class RouterWrapper implements RouterWrapperInterface{
    router: Router;
    constructor() {
        this.router = router;
    }
    getQuery() :LocationQuery{
        return this.router.currentRoute.value.query;
    }
    toTopPage(): void{
        this.router.push({path: PATHS.TOP.toString()});
    }

    toEditorPage(template: string): void {
        this.router.push({path: PATHS.EDITOR.toString(), query: {template: template}});
    }

}