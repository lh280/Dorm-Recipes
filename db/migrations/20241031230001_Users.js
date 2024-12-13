/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Migration File
exports.up = function (knex) {
  return knex.schema.createTable("Users", (table) => {
    table.increments("id").primary();
    table.string("google_id");
    table.string("username").notNullable().unique();
    // Changed from string to timestamp, and let it auto-generate
    table.timestamp("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
