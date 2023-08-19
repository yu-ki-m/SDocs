import { Request, Response, NextFunction} from 'express';
import { TemplateSummaryServiceInterface } from '../TemplateSummary.Service'
import { TemplateSummaryResponseInterface } from '../TemplateSummary.Response'
import { TemplateSummaryRepositoryInterface } from '../TemplateSummary.Repository'


type ExpressAppFunction = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>

export default class TemplateSummaryController {
    templateSummaryRepository:TemplateSummaryRepositoryInterface;
    templateSummaryService:TemplateSummaryServiceInterface;

    constructor(templateSummaryService:TemplateSummaryServiceInterface,templateSummaryRepository:TemplateSummaryRepositoryInterface){
        this.templateSummaryRepository = templateSummaryRepository;
        this.templateSummaryService = templateSummaryService;
    }
    getTemplateSummaries = (): ExpressAppFunction => {
        return async (req: Request, res: Response) => {

            const templateSummaryResponse: TemplateSummaryResponseInterface = await this.templateSummaryService.getTemplateSummaries();

            res.json( templateSummaryResponse);
        }
    }
}

