/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Pantry", (table) => {
    table
      .integer("user_id")
      .references("user_id")
      .inTable("User")
      .onDelete("CASCADE");
    table
      .integer("ingredient_id")
      .references("ingredient_id")
      .inTable("Ingredients")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Pantry");
};
