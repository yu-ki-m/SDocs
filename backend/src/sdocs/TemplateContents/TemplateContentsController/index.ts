import { Request, Response, NextFunction} from 'express';
import { TemplateContentsServiceInterface } from '../TemplateContentsService'
import { TemplateContentsResponseInterface } from '../TemplateContentsResponse'
import { TemplateContentsRepositoryInterface } from '../TemplateContentsRepository'


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

