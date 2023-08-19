import * as dotenv from 'dotenv'
dotenv.config()

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('template_summaries', function (table) {
        table.string("template_id",       255).primary().notNullable();
        table.string('viewName', 255).notNullable();
        table.string('describe', 255).notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
        return knex.schema
        .dropTable("template_summaries");
    } 
    return Promise.resolve(
        console.log("test,development環境以外ではdownは実行されません")
    )
}
