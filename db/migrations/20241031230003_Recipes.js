/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function Create(knex) {
  return knex.schema.createTable("Recipes", (table) => {
    table.increments("recipe_id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.text("instructions");
    table.integer("prep_time");
    table.integer("servings");
    table.integer("user_id").references("user_id").inTable("Users");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function Delete(knex) {
  return knex.schema.dropTableIfExists("Recipe");
};
