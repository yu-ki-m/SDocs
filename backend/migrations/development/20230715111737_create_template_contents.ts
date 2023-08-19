import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('template_contents', function (table) {
        table.string("template_summary_id",255).notNullable().references("template_id").inTable("template_summaries");
        table.string("template_content_id",255).notNullable();
        table.primary(["template_summary_id","template_content_id"]);
        table.integer("order").notNullable();
        table.string("content_type",255).notNullable();
        table.text("contents");
    })
}


export async function down(knex: Knex): Promise<void> {
    if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
        return knex.schema
        .dropTable("template_contents");
    } 
    return Promise.resolve(
        console.log("test,development環境以外ではdownは実行されません")
    )
}

