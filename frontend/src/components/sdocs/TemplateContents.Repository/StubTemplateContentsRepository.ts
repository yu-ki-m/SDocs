import { TemplateContentsInterface } from '../TemplateContents'
import { TemplateContentsRepositoryInterface } from './index'
export class StubTemplateContentsRepository implements TemplateContentsRepositoryInterface {
    get_wasCalled = false
    get_returnValue: TemplateContentsInterface[] = []
    get_actualId: string = ''
    async get(id: string): Promise<TemplateContentsInterface[]> {
        this.get_wasCalled = true
        this.get_actualId = id
        return this.get_returnValue
    }
}
