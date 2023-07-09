
export interface TemplateSummaryInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
    tags: Tag[];
}

export interface Tag {
    tagViewName: string;
}

/**
 * TemplateSummary
 * @param id テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param path テンプレートのサマリのパス
 * @param describe テンプレートのサマリの説明
 * @param tags  テンプレートのサマリのタグ
 */
export class TemplateSummary implements TemplateSummaryInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
    tags: Tag[];

    constructor(id: string, viewName: string, path: string, describe: string , tags: Tag[]){
        this.id = id;
        this.viewName = viewName;
        this.path = path;
        this.describe = describe;
        this.tags = tags;
    }

}
