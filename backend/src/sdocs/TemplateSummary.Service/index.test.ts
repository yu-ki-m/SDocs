import {TemplateSummaryService, TemplateSummaryServiceInterface } from "./index";
import { StubTemplateSummaryRepository } from '../TemplateSummary.Repository/stub'
import  { Tag } from '../TemplateSummary.Model'
import TemplateSummaryResponse from '../TemplateSummary.Response'


describe("getTemplateSummaries", () => {
  it("テンプレートサマリ一覧を取得する", async () => {
    // * Arrage
    const stubTemplateSummaryRepository = new StubTemplateSummaryRepository()

    // テストデータ
    const expectTemplateSummaryResponse_0 = new TemplateSummaryResponse("1","name1","path1","desc1",[new Tag("tag1.1"),new Tag("tag1.2")])
    const expectTemplateSummaryResponse_1 = new TemplateSummaryResponse("2","name2","path2","desc2",[new Tag("tag2.1"),new Tag("tag2.2")])
    stubTemplateSummaryRepository.getAll_returnValue = [ expectTemplateSummaryResponse_0, expectTemplateSummaryResponse_1];

    // インスタンス化
    const templateSummaryService:TemplateSummaryServiceInterface = new TemplateSummaryService(stubTemplateSummaryRepository);

    // * Act
    const actualTemplateSummaryResponseList =  await  templateSummaryService.getTemplateSummaries();

    // * Assert
    expect(actualTemplateSummaryResponseList.length).toEqual(2);
    expect(actualTemplateSummaryResponseList[0]).toEqual(expectTemplateSummaryResponse_0)
    expect(actualTemplateSummaryResponseList[1]).toEqual(expectTemplateSummaryResponse_1)
  });
});

