import * as dotenv from 'dotenv'
dotenv.config()

import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('template_summary_tags', function (table) {
        table.increments('id').primary().notNullable();
        table.string("template_id",       255).notNullable().unsigned().references('id').inTable('template_summaries');
        table.string('tagViewName',     255).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    if(process.env.NODE_ENV === "unittest" || process.env.NODE_ENV === "development"){
        return knex.schema
        .dropTable("template_summary_tags");
    } 
    return Promise.resolve(
        console.log("unittest,development環境以外ではdownは実行されません")
    )
}

