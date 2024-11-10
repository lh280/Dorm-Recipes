/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Ingredients", (table) => {
    table.increments("ingredient_id").primary(); // Auto-incrementing ID as the primary key
    table.string("ingredient_name").notNullable().unique(); // Name column, not nullable and unique
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Ingredients"); // Rollback logic to drop the table
};
