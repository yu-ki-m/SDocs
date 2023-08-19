
import { TemplateContentsRepositoryInterface } from '../TemplateContents.Repository'
import { TemplateContentsInterface } from '../TemplateContents'
import{  TemplateContentsResponse ,TemplateContentsResponseInterface } from '../TemplateContents.Response'

export interface TemplateContentsServiceInterface {
    getTemplateContentsById(id: string): Promise<TemplateContentsResponseInterface>
}

export class TemplateContentsService implements TemplateContentsServiceInterface {

    templateContentsRepository:TemplateContentsRepositoryInterface

    constructor(templateContentsRepository:TemplateContentsRepositoryInterface) {
        this.templateContentsRepository = templateContentsRepository
    }

    async getTemplateContentsById(id: string): Promise<TemplateContentsResponseInterface> {
        const templateContentsList:TemplateContentsInterface[] = await this.templateContentsRepository.byId(id);
        return new TemplateContentsResponse(templateContentsList);
    }   
}


