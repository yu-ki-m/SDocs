
export interface TemplateSummaryInterface{
    templateId: string;
    viewName: string;
    describe:string;
    tags: TagInterface[];
}

export interface TagInterface {
    tagViewName: string;
}

/**
 * TemplateSummary
 * @param templateId テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param describe テンプレートのサマリの説明
 * @param tags  テンプレートのサマリのタグ
 */
export class TemplateSummary implements TemplateSummaryInterface{
    templateId: string;
    viewName: string;
    describe:string;
    tags: TagInterface[];

    constructor(templateId: string, viewName: string, describe: string , tags: TagInterface[]){
        this.templateId = templateId;
        this.viewName = viewName;
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
