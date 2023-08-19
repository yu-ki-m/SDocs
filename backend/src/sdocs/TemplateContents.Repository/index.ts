

import { TemplateContentsDBEntityInterface, TemplateContentsDBEntity } from '../TemplateContents.DBEntity'

import  {TemplateContents, TemplateContentsInterface } from '../TemplateContents'
import {Knex} from "knex";


export interface TemplateContentsRepositoryInterface{
    // getAll(): Promise<TemplateContentsInterface[]>
    byId(id: string): Promise<TemplateContentsInterface[]>
    // create(newTemplateContents: NewTemplateContents): Promise<TemplateContentsInterface>
    // update(templateDetail: TemplateDetail): Promise<TemplateContentsInterface>
    // delete(id: number): Promise<TemplateContentsInterface>
}

export class TemplateContentsRepository implements TemplateContentsRepositoryInterface {
    db: Knex;
    constructor(db: Knex) {
        this.db = db
    }

    async byId(templateSummaryId: string): Promise<TemplateContentsInterface[]> {
        const templateContentsEntities:TemplateContentsDBEntity[] = await this.db<TemplateContentsDBEntityInterface>('template_contents').where('template_summary_id',templateSummaryId).orderBy('order');

        const templateContentsList:TemplateContents[] = templateContentsEntities.map((templateContentsEntity: TemplateContentsDBEntity) => {
            return new TemplateContents(
                templateContentsEntity.template_summary_id,
                templateContentsEntity.template_content_id,
                templateContentsEntity.order,
                templateContentsEntity.content_type,
                templateContentsEntity.contents
            );
        });
        return templateContentsList
    }
}

