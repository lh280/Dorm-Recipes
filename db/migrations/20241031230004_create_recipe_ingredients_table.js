/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Migration File
exports.up = function (knex) {
  return knex.schema.createTable("Recipe_Ingredients", (table) => {
    table
      .integer("recipe_id")
      .references("recipe_id")
      .inTable("Recipes")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("ingredient_id")
      .references("ingredient_id")
      .inTable("Ingredients")
      .onDelete("CASCADE")
      .notNullable();
    table.decimal("quantity").notNullable();
    table.string("unit").notNullable();

    // Add composite primary key
    table.primary(["recipe_id", "ingredient_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Recipe_Ingredients");
};
