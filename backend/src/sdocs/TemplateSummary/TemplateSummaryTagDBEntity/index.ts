export interface TagDBEntityInterface {
    id: number;
    template_id: string;
    tagViewName: string;
}

/**
 * TemplateSummaryTag
 * @param id テンプレートのサマリのタグのID
 * @param template_id テンプレートのサマリのID
 * @param tagViewName テンプレートのサマリのタグの表示名
 */
export class TagDBEntity implements TagDBEntityInterface{
    id: number;
    template_id: string;
    tagViewName: string;

    constructor(id: number, template_id: string, tagViewName: string){
        this.id = id;
        this.template_id = template_id;
        this.tagViewName = tagViewName;
    }
}

