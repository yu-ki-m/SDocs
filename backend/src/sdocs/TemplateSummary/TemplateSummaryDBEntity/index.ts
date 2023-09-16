
export interface TemplateSummaryDBEntityInterface{
    template_id: string;
    viewName: string;
    path: string;
    describe:string;
}
/**
 * TemplateSummaryDBEntity
 * @param template_id テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param path テンプレートのサマリのパス
 * @param describe テンプレートのサマリの説明
 */
export class TemplateSummaryDBEntity implements TemplateSummaryDBEntityInterface{
    template_id: string;
    viewName: string;
    path: string;
    describe:string;

    constructor(template_id: string, viewName: string, path: string, describe: string ){
        this.template_id = template_id;
        this.viewName = viewName;
        this.path = path;
        this.describe = describe;
    }
}



