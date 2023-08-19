export interface TemplateSummaryInterface {
    templateId: string
    viewName: string
    describe: string
    tags: Tag[]
}

export interface Tag {
    tagViewName: string
}

/**
 * TemplateSummary
 * @param templateId テンプレートのサマリのID
 * @param viewName テンプレートのサマリの名前
 * @param describe テンプレートのサマリの説明
 * @param tags  テンプレートのサマリのタグ
 */
export class TemplateSummary implements TemplateSummaryInterface {
    templateId: string
    viewName: string
    describe: string
    tags: Tag[]

    constructor(templateId: string, viewName: string, describe: string, tags: Tag[]) {
        this.templateId = templateId
        this.viewName = viewName
        this.describe = describe
        this.tags = tags
    }
}
