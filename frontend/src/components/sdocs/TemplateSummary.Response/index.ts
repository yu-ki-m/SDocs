import { TemplateSummaryInterface } from '../TemplateSummary'

export interface TemplateSummariesResponseInterface {
    templateSummaries: TemplateSummaryInterface[]
}
export class TemplateSummariesResponse implements TemplateSummariesResponseInterface {
    templateSummaries: TemplateSummaryInterface[]
    constructor(templateSummaries: TemplateSummaryInterface[]) {
        this.templateSummaries = templateSummaries
    }
}
