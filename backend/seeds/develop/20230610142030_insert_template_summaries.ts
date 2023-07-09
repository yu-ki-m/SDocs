import { Knex } from "knex";
import Logger, { LoggerInterface } from "../../src/Logger"
const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);


export async function seed(knex: Knex): Promise<void> {

    const seedName:string = __filename.split(/[\\/]/).slice(-1)[0];
    logger.knexSeedLog(seedName);
    
    await knex("template_summaries")
    .insert(
        [
            {id:"279f24d3-3a27-4376-8ced-9dd9398adc86",viewName:"Empty Docs",path:"path1",describe:"説明１"},
            {id:"a2d501ec-1cdf-43ec-b195-4422ef8b710b",viewName:"Docs2",path:"path2",describe:"説明２"} 
        ]
    );
}
