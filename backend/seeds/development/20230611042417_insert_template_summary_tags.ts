import { Knex } from "knex";
import SDocsLogger, { SDocsLoggerInterface,createLogger } from "../../src/SDocsLogger"
import { getLogConfig } from "../../logger.config"
const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));


export async function seed(knex: Knex): Promise<void> {

    const seedName:string = __filename.split(/[\\/]/).slice(-1)[0];
    logger.knexSeedLog(seedName);

    await knex("template_summary_tags")
    .insert(
        [
            {template_id:"279f24d3-3a27-4376-8ced-9dd9398adc86",tagViewName:"base"},
            {template_id:"279f24d3-3a27-4376-8ced-9dd9398adc86",tagViewName:"sample"},
            {template_id:"a2d501ec-1cdf-43ec-b195-4422ef8b710b",tagViewName:"base1"}, 
            {template_id:"a2d501ec-1cdf-43ec-b195-4422ef8b710b",tagViewName:"sample2"} 
        ]
    );
}
