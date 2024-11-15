/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./db/seeds/ingredientsSeed.json");
    const data = JSON.parse(contents);

    // Deletes ALL existing entries
    return knex("Ingredients")
        .del()
        .then(() => knex.batchInsert("Ingredients", data));
};