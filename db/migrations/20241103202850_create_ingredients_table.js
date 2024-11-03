exports.up = function (knex) {
  return knex.schema.createTable("Ingredients", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID as the primary key
    table.string("name").notNullable().unique(); // Name column, not nullable and unique
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Ingredients"); // Rollback logic to drop the table
};
