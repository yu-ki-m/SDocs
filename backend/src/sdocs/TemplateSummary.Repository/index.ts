

import { TemplateSummaryDBEntityInterface, TemplateSummaryDBEntity } from '../TemplateSummary.DBEntity'
import { TagDBEntity, TagDBEntityInterface } from '../TemplateSummaryTag.DBEntity'
import TemplateSummaryModel, { TemplateSummaryModelInterface, Tag } from '../TemplateSummary.Model'
import {Knex} from "knex";


export interface TemplateSummaryRepositoryInterface{
    getAll(): Promise<TemplateSummaryModelInterface[]>
    // byId(id: number): Promise<TemplateSummaryModelInterface>
    // create(newTemplateSummary: NewTemplateSummary): Promise<TemplateSummaryModelInterface>
    // update(templateDetail: TemplateDetail): Promise<TemplateSummaryModelInterface>
    // delete(id: number): Promise<TemplateSummaryModelInterface>
}

export class TemplateSummaryRepository implements TemplateSummaryRepositoryInterface {
    db: Knex;
    constructor(db: Knex) {
        this.db = db
    }
    async getAll(): Promise<TemplateSummaryModelInterface[]> {
        const templateSummariesDBEntity:TemplateSummaryDBEntity[]= await this.db<TemplateSummaryDBEntityInterface>('template_summaries');

        const templateSummariesPromise = templateSummariesDBEntity.map( async (TemplateSummaryDBEntity:TemplateSummaryDBEntity)=>{
            const tagEntities:TagDBEntity[] = await this.db<TagDBEntityInterface>('template_summary_tags').where('template_id',TemplateSummaryDBEntity.id);
            const tags:Tag[] = tagEntities.map((TagDBEntity:TagDBEntity)=>{
                return new Tag(TagDBEntity.tagViewName)
            })
            
            return new TemplateSummaryModel(TemplateSummaryDBEntity.id,TemplateSummaryDBEntity.viewName,TemplateSummaryDBEntity.path,TemplateSummaryDBEntity.describe,tags)
        })
        const templateSummaries:TemplateSummaryModel[] = await  Promise.all(templateSummariesPromise);

        return templateSummaries
    }
}

