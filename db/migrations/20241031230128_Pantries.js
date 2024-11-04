/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pantry", (table) => {
    table
      .integer("user_id")
      .references("user_id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("ingredient_id")
      .references("ingredient_id")
      .inTable("ingredient")
      .onDelete("CASCADE");
    table.number("quantity").string("unit");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("pantry");
};
