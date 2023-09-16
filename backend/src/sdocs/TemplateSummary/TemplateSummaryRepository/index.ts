

import { TemplateSummaryDBEntityInterface, TemplateSummaryDBEntity } from '../TemplateSummaryDBEntity'
import { TagDBEntity, TagDBEntityInterface } from '../TemplateSummaryTagDBEntity'
import {  TemplateSummary,TemplateSummaryInterface, Tag } from '../TemplateSummary'
import {Knex} from "knex";


export interface TemplateSummaryRepositoryInterface{
    getAll(): Promise<TemplateSummaryInterface[]>
    // byId(id: number): Promise<TemplateSummaryInterface>
    // create(newTemplateSummary: NewTemplateSummary): Promise<TemplateSummaryInterface>
    // update(templateDetail: TemplateDetail): Promise<TemplateSummaryInterface>
    // delete(id: number): Promise<TemplateSummaryInterface>
}

export class TemplateSummaryRepository implements TemplateSummaryRepositoryInterface {
    db: Knex;
    constructor(db: Knex) {
        this.db = db
    }
    async getAll(): Promise<TemplateSummaryInterface[]> {
        const templateSummariesDBEntity:TemplateSummaryDBEntity[]= await this.db<TemplateSummaryDBEntityInterface>('template_summaries');

        const templateSummariesPromise = templateSummariesDBEntity.map( async (TemplateSummaryDBEntity:TemplateSummaryDBEntity)=>{
            const tagEntities:TagDBEntity[] = await this.db<TagDBEntityInterface>('template_summary_tags').where('template_id',TemplateSummaryDBEntity.template_id);
            const tags:Tag[] = tagEntities.map((TagDBEntity:TagDBEntity)=>{
                return new Tag(TagDBEntity.tagViewName)
            })
            
            return new TemplateSummary(TemplateSummaryDBEntity.template_id,TemplateSummaryDBEntity.viewName,TemplateSummaryDBEntity.describe,tags)
        })
        const templateSummaries:TemplateSummary[] = await  Promise.all(templateSummariesPromise);

        return templateSummaries
    }
}

