import {TemplateContentsService, TemplateContentsServiceInterface } from "./index";
import { StubTemplateContentsRepository } from '../TemplateContents.Repository/stub'
import { TemplateContents, TemplateContentsInterface } from '../TemplateContents'

import {TemplateContentsResponse,TemplateContentsResponseInterface} from '../TemplateContents.Response'



describe("getTemplateContents", () => {
  it("テンプレートの内容を取得する", async () => {
    // * Arrage
    const stubTemplateContentsRepository = new StubTemplateContentsRepository()

    // テストデータ
    const templateContentsList:TemplateContentsInterface[] = [
        new TemplateContents("template_summary_id_1","template_content_id_1",1,"content_type_1","contents_1"),
        new TemplateContents("template_summary_id_1","template_content_id_2",2,"content_type_2","contents_2"),
        new TemplateContents("template_summary_id_1","template_content_id_3",3,"content_type_3","contents_3"),
    ] ;
    stubTemplateContentsRepository.byId_returnValue = templateContentsList;

    const expectTemplateContentsResponse:TemplateContentsResponseInterface = new TemplateContentsResponse(templateContentsList);
     
    // インスタンス化
    const templateContentsService:TemplateContentsServiceInterface = new TemplateContentsService(stubTemplateContentsRepository);
    // * Act
    const actualTemplateContentsResponse = await  templateContentsService.getTemplateContentsById("template_summary_id_1");

    // * Assert
    expect(stubTemplateContentsRepository.byId_wasCalled).toBe(true);
    expect(stubTemplateContentsRepository.byId_actualId).toBe("template_summary_id_1");

    expect(actualTemplateContentsResponse).toEqual(expectTemplateContentsResponse);
  });
});

