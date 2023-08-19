
export interface TemplateSummaryModelInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
    tags: TagInterface[];
}

export interface TagInterface {
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
export default class TemplateSummaryModel implements TemplateSummaryModelInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
    tags: TagInterface[];

    constructor(id: string, viewName: string, path: string, describe: string , tags: TagInterface[]){
        this.id = id;
        this.viewName = viewName;
        this.path = path;
        this.describe = describe;
        this.tags = tags;
    }
}

export class Tag implements TagInterface{
    tagViewName: string;

    constructor(tagViewName: string){
        this.tagViewName = tagViewName;
    }
}
