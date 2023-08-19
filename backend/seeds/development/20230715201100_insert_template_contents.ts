import { Knex } from "knex";
import SDocsLogger, { SDocsLoggerInterface, createLogger } from "../../src/SDocsLogger"
import { TemplateContentsDBEntity } from "../../src/sdocs/TemplateContents.DBEntity"
import { getLogConfig } from "../../logger.config"
const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));


export const record1_1 = new TemplateContentsDBEntity(
    "279f24d3-3a27-4376-8ced-9dd9398adc86",
    "740a8257-f171-4128-8242-6cd6103c7aa9",
    1,
    "quill",
    "<h1>Empty Docs</h1>"
)

export const record1_2 = new TemplateContentsDBEntity(
    "279f24d3-3a27-4376-8ced-9dd9398adc86",
    "ba8fc5c5-38a8-4c30-a7a9-b50184f12aa1",
    2,
    "quill",
    "<p> [ text ]</p>" 
)
export const record1_3 = new TemplateContentsDBEntity(
    "279f24d3-3a27-4376-8ced-9dd9398adc86",
    "7982f846-6171-4541-bf77-d25471c1ac6b",
    3,
    "nest-table",
    `{"id":"1a46e2d9-dbf5-430a-bedb-031e0821cae3","tableTitle":"","records":[{"id":"951e489a-65d9-4f0f-8b6b-0c3a9ed206ba","indent":0,"isHeader":true,"isTitleOnly":false,"cells":[{"id":"839efb61-e9d9-498b-9c35-f3b92126ccf8","cellType":"Quill","content":""},{"id":"e244446a-cdde-4a79-beec-bd3d728e99ce","cellType":"Quill","content":""},{"id":"fa64f87c-d4f8-4de4-840e-06fc729e47fd","cellType":"Quill","content":""}]},{"id":"09fe966e-e41b-45c0-8a9e-a3910f50fc16","indent":0,"isHeader":false,"isTitleOnly":false,"cells":[{"id":"634566b2-f3a2-49ea-843a-d00131ad12f7","cellType":"Quill","content":""},{"id":"55806d0f-4273-4a50-ab31-4f213c4d79bb","cellType":"Quill","content":""},{"id":"d2c39d94-fd3f-4e98-a022-08a1328f621b","cellType":"Quill","content":""}]},{"id":"3e4dbe13-5e1a-4f74-aed6-ea9ebcbf9a8e","indent":1,"isHeader":false,"isTitleOnly":false,"cells":[{"id":"95537289-f790-42cd-a343-16bb4c780782","cellType":"Quill","content":""},{"id":"dd1982ac-0f54-4924-9df5-a27b8900ef9f","cellType":"Quill","content":""},{"id":"37ff6964-b9b7-48e7-a51a-a724138859f1","cellType":"Quill","content":""}]},{"id":"d9fc5b15-b8c5-4e3e-bcdf-66e37f1b778f","indent":1,"isHeader":false,"isTitleOnly":false,"cells":[{"id":"a95422c1-3e4f-4ddf-b80b-aa2a9ceb5838","cellType":"Quill","content":""},{"id":"6905dc00-868c-45a2-8862-1b4d20ee5939","cellType":"Quill","content":""},{"id":"456652b0-845f-4b73-8b0d-202dbcaceaa5","cellType":"Quill","content":""}]}],"tableContentModule":{"uuid":{}},"tableContentOptions":{"showTableContentIdOption":true,"showRecordIdOption":true,"showRecordOption":true,"showRowOption":true}}` 
)

export const record2_1 = new TemplateContentsDBEntity(
    "a2d501ec-1cdf-43ec-b195-4422ef8b710b", 
    "01b018fd-81f0-4b5f-a923-f2b984633f5f",
    1,
    "quill",
    "<p> [ text ]</p>" 
)
export async function seed(knex: Knex): Promise<void> {
    const seedName:string = __filename.split(/[\\/]/).slice(-1)[0];
    logger.knexSeedLog(seedName);

    await knex("template_contents").insert(
        [
            record1_1,
            record1_2,
            record1_3,
            record2_1
        ]
    )
}

