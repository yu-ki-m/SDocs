import {TemplateSummaryInterface } from '../TemplateSummary'

export interface TemplateSummaryResponseInterface{
    templateSummaries: TemplateSummaryInterface[];
}

/**
 * TemplateSummaryResponse
 * @param templateSummaries
 */
export default class TemplateSummaryResponse implements TemplateSummaryResponseInterface {
    templateSummaries: TemplateSummaryInterface[];

    constructor(templateSummaries: TemplateSummaryInterface[]){
        this.templateSummaries = templateSummaries;
    }
}

