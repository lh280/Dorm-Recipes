/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

exports.seed = async function (knex) {

    // Deletes ALL existing entries
    await knex("Reviews").del();
    await knex("Recipe_Ingredients").del();
    await knex("Pantry").del();
    await knex("Recipes").del();
    await knex("Ingredients").del();
    await knex("Users").del();
};