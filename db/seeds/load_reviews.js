/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./db/seeds/reviewSeed.json");
    const data = JSON.parse(contents);
    console.group(data);

    // Deletes ALL existing entries
    return knex("Reviews")
        .del()
        .then(() => knex.batchInsert("Reviews", data));
};