/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Migration File
exports.up = function (knex) {
  return knex.schema.createTable("Reviews", (table) => {
    table.increments("review_id").primary();
    table
      .integer("recipe_id")
      .references("recipe_id")
      .inTable("Recipes")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("Users")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("rating")
      .notNullable()
      .checkIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    table.text("content");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Reviews");
};
