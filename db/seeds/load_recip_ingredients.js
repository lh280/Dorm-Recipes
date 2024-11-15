/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./db/seeds/recipeIngredientsSeed.json");
    const data = JSON.parse(contents);

    // Deletes ALL existing entries
    return knex("Recipe_Ingredients")
        .del()
        .then(() => knex.insert("Recipe_Ingredients", data));
};