
export interface TemplateInterface{
    templateId: string;
    viewName: string;
    version: string;
    timeStamp: string;
    docsId: string;
}

/**
 * Template
 * @param templateId テンプレートのID
 * @param viewName テンプレートの名前
 * @param version テンプレートのバージョン
 * @param timeStamp テンプレートのタイムスタンプ
 * @param docsId DocsID
 */
export class Template implements TemplateInterface{
    templateId: string;
    viewName: string;
    version: string;
    timeStamp: string;
    docsId: string;

    constructor(templateId: string, viewName: string, version: string, timeStamp: string, docsId: string){
        this.templateId = templateId;
        this.viewName = viewName;
        this.version = version;
        this.timeStamp = timeStamp;
        this.docsId = docsId;
    }

}
