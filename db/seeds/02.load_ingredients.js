/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./db/seeds/ingredientsSeed.json");
    const data = JSON.parse(contents);

    // Deletes ALL existing entries
    return knex("Ingredients")
        .del()
        .then(() => knex.batchInsert("Ingredients", data))
        .then(() => knex.raw("SELECT setval(pg_get_serial_sequence('\"Ingredients\"', 'ingredient_id'), (SELECT max(\"ingredient_id\") FROM \"Ingredients\") + 1);"));
        
};