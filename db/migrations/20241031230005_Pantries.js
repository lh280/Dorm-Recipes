// Migration File
exports.up = function (knex) {
  return knex.schema.createTable("Pantry", (table) => {
    // Made singular to be consistent
    table
      .integer("id")
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE")
      .notNullable();
    table
      .integer("ingredient_id")
      .references("ingredient_id")
      .inTable("Ingredients")
      .onDelete("CASCADE")
      .notNullable();
    table.decimal("quantity").notNullable(); // Changed from number() to decimal()
    table.string("unit").notNullable();

    // Add composite primary key
    table.primary(["id", "ingredient_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Pantry");
};
