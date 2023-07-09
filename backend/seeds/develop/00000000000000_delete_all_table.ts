import { Knex } from "knex";
import Logger, { LoggerInterface } from "../../src/Logger"
const logger:LoggerInterface = new Logger(console.debug,console.log,console.info,console.warn,console.error);

export async function seed(knex: Knex): Promise<void> {

    if(process.env.NODE_ENV !== "unittest" && process.env.NODE_ENV !== "development"){
        throw new Error("production環境では実行できません。")
    }

    const seedName:string = __filename.split(/[\\/]/).slice(-1)[0];
    logger.knexSeedLog(seedName);

    await knex("template_summary_tags").del();
    await knex("template_summaries").del();

}
