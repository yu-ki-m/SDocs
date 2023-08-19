import { Request, Response, NextFunction} from 'express';
import { TemplateContentsServiceInterface } from '../TemplateContents.Service'
import { TemplateContentsResponseInterface } from '../TemplateContents.Response'
import { TemplateContentsRepositoryInterface } from '../TemplateContents.Repository'


type ExpressAppFunction = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>

export default class TemplateContentsController {
    templateContentsRepository:TemplateContentsRepositoryInterface;
    templateContentsService:TemplateContentsServiceInterface;

    constructor(templateContentsService:TemplateContentsServiceInterface,templateContentsRepository:TemplateContentsRepositoryInterface){
        this.templateContentsRepository = templateContentsRepository;
        this.templateContentsService = templateContentsService;
    }
    getTemplateContentsById = (): ExpressAppFunction => {
        return async (req: Request, res: Response) => {
            const templateContents: TemplateContentsResponseInterface = await this.templateContentsService.getTemplateContentsById(req.params.id);
            res.json(templateContents);
        }
    }

}

