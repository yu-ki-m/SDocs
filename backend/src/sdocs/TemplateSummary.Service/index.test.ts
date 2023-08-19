import {TemplateSummaryService, TemplateSummaryServiceInterface } from "./index";
import { StubTemplateSummaryRepository } from '../TemplateSummary.Repository/stub'
import  { TemplateSummary,Tag } from '../TemplateSummary'
import TemplateSummaryResponse from '../TemplateSummary.Response'


describe("getTemplateSummaries", () => {
  it("テンプレートサマリ一覧を取得する", async () => {
    // * Arrage
    const stubTemplateSummaryRepository = new StubTemplateSummaryRepository()

    // テストデータ
    const expectTemplateSummaries = [new TemplateSummary("1","name1","desc1",[new Tag("tag1.1"),new Tag("tag1.2")]),new TemplateSummary("2","name2","desc2",[new Tag("tag2.1"),new Tag("tag2.2")])];
    stubTemplateSummaryRepository.getAll_returnValue = expectTemplateSummaries

    const expectTemplateSummaryResponse = new TemplateSummaryResponse( expectTemplateSummaries);
    // インスタンス化
    const templateSummaryService:TemplateSummaryServiceInterface = new TemplateSummaryService(stubTemplateSummaryRepository);

    // * Act
    const actualTemplateSummaryResponse =  await  templateSummaryService.getTemplateSummaries();

    // * Assert
    expect(actualTemplateSummaryResponse).toEqual(expectTemplateSummaryResponse);
  });
});

