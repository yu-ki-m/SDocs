import { Knex } from "knex";
import SDocsLogger, { SDocsLoggerInterface ,createLogger} from "../../src/SDocsLogger"
import { getLogConfig } from "../../logger.config"
const logger:SDocsLoggerInterface = new SDocsLogger(createLogger(getLogConfig()));

export async function seed(knex: Knex): Promise<void> {

    if(process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development"){
        throw new Error("production環境では実行できません。")
    }

    const seedName:string = __filename.split(/[\\/]/).slice(-1)[0];
    logger.knexSeedLog(seedName);

    await knex("template_contents").del();
    await knex("template_summary_tags").del();
    await knex("template_summaries").del();

}
