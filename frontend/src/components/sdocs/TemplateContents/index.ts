export interface TemplateContentsInterface {
    template_summary_id: string
    template_content_id: string
    order: number
    content_type: string
    contents: string
}
/**
 * TemplateContents
 * @param template_summary_id テンプレートのID
 * @param template_content_id テンプレートの内容にごとに振られるID
 * @param order テンプレートの内容の順番
 * @param content_type テンプレートの内容のタイプ
 * @param contents テンプレートの内容
 */
export class TemplateContents implements TemplateContentsInterface {
    template_summary_id: string
    template_content_id: string
    order: number
    content_type: string
    contents: string

    constructor(
        template_summary_id: string,
        template_content_id: string,
        order: number,
        content_type: string,
        contents: string
    ) {
        this.template_summary_id = template_summary_id
        this.template_content_id = template_content_id
        this.order = order
        this.content_type = content_type
        this.contents = contents
    }
}
