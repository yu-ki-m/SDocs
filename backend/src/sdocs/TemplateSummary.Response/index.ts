import  { TagInterface } from "../TemplateSummary.Model"
export interface TemplateSummaryResponseInterface{
    id: string;
    viewName: string;
    path: string;
    describe:string;
    tags: TagInterface[];
}

/**
 * TemplateSummary
 * @param id テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param path テンプレートのサマリのパス
 * @param describe テンプレートのサマリの説明
 * @param tags  テンプレートのサマリのタグ
 */
export default class TemplateSummaryResponse {
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

