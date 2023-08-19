
export interface TemplateSummaryDBEntityInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
}
/**
 * TemplateSummaryDBEntity
 * @param id テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param path テンプレートのサマリのパス
 * @param describe テンプレートのサマリの説明
 */
export class TemplateSummaryDBEntity implements TemplateSummaryDBEntityInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;

    constructor(id: string, viewName: string, path: string, describe: string ){
        this.id = id;
        this.viewName = viewName;
        this.path = path;
        this.describe = describe;
    }
}



