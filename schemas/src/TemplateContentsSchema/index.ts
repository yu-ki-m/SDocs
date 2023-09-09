import { TemplateContentsInterface as FE_TemplateContentsInterface  } from '../../../frontend/src/components/sdocs/TemplateContents'
import { TemplateContentsInterface as BE_TemplateContentsInterface } from '../../../backend/src/sdocs/TemplateContents'
import { SameType } from '../index'

export class TemplateContentsSchema implements SameType< FE_TemplateContentsInterface,BE_TemplateContentsInterface> {
    constructor(
        public template_summary_id: string,
        public template_content_id: string,
        public order: number,
        public content_type: string,
        public contents: string
    ){}
}
