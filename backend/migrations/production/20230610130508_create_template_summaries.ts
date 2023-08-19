import * as dotenv from 'dotenv'
dotenv.config()

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('template_summaries', function (table) {
        table.string("id",       255).primary().notNullable();
        table.string('viewName', 255).notNullable();
        table.string('path',     255).notNullable();
        table.string('describe', 255).notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    if(process.env.NODE_ENV === "unittest" || process.env.NODE_ENV === "development"){
        return knex.schema
        .dropTable("template_summaries");
    } 
    return Promise.resolve(
        console.log("unittest,development環境以外ではdownは実行されません")
    )
}
