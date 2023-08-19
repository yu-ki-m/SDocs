import { TemplateSummaryInterface, TemplateSummary } from '../TemplateSummary.Entity'
import { TemplateInterface, Template } from '../Template.Entity';
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary"
import  { HttpInterface } from '../http/HttpClient/index'
import { BrowserLogger } from '../../lib/BrowserLogger'



  
export interface TemplateSummariesRepositoryInterface{
    getAll(): Promise<TemplateSummaryInterface[]>
    get(id:string): Promise<TemplateInterface>
}

export class TemplateSummariesRepository implements TemplateSummariesRepositoryInterface {

    httpClient:HttpInterface
    emptyTemplateSummary: TemplateSummary = new TemplateSummary("00000000-0000-0000-0000-000000000000","Empty Docs","/"    ,"Empty Template",[{"tagViewName": "Template"}]);

    constructor (httpClient:HttpInterface) {
        this.httpClient = httpClient;
    }

    async get(id: string): Promise<TemplateInterface> {
        // TODO: ここでAPIを叩く
        const templateSummaries:TemplateSummary[]= structuredClone(templateSummariesA);
        const templateSummary = templateSummaries.find((templateSummary) => templateSummary.id === id)
        if (!templateSummary) {
            throw new Error('TemplateSummary が見つかりませんでした')
        }
        const template = new Template(templateSummary.id, templateSummary.viewName,"1.00","","")

        return template
    }

    async getAll(): Promise<TemplateSummaryInterface[]> {
        let templateSummaries:TemplateSummary[] = []
        try{
            const templateSummariesResponse = await this.httpClient.get<TemplateSummary[]>('/template-summaries')
            templateSummaries = [...templateSummariesResponse.data]
        }catch(e:any){
            if(e instanceof Error){
                BrowserLogger.error(e.message);
            }else{
                BrowserLogger.error("Unknown Error");
            }
        }
        templateSummaries = [this.emptyTemplateSummary,...templateSummaries]

        return templateSummaries
    }


}