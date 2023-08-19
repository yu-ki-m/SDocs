import { TemplateContentsInterface } from '../TemplateContents'
export interface TemplateContentsResponseInterface {
    templateContentsList: TemplateContentsInterface[]
}
/**
 * TemplateContentsResponse
 * @param templateContentsList
 */
export class TemplateContentsResponse implements TemplateContentsResponseInterface {
    templateContentsList: TemplateContentsInterface[]

    constructor(templateContentsList: TemplateContentsInterface[]) {
        this.templateContentsList = templateContentsList
    }
}
