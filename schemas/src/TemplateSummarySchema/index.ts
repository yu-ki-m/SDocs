import { TemplateSummaryInterface as FE_TemplateSummaryInterface } from '../../../frontend/src/components/sdocs/TemplateSummary'
import { TemplateSummaryInterface as BE_TemplateSummaryInterface } from '../../../backend/src/sdocs/TemplateSummary/TemplateSummary'
import { SameType } from '../index'

export class TemplateSummarySchema implements SameType< FE_TemplateSummaryInterface,BE_TemplateSummaryInterface> {
    constructor(
        public templateId: string,
        public viewName: string,
        public describe: string,
        public tags: { tagViewName: string }[]
    ){}
}
