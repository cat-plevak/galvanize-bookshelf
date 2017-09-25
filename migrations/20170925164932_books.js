exports.up = function(knex, Promise) {
  return knex.schema.createTable("books", function(table) {
    table.increments();
    table.varchar("title", 255).notNullable().default("");
    table.varchar("author", 255).notNullable().default("");
    table.varchar("genre", 255).notNullable().default("");
    table.text("description").notNullable().default("");
    table.text("cover_url").notNullable().default("");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {

};
