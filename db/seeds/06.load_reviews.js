/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./db/seeds/reviewSeed.json");
    const data = JSON.parse(contents);
    // Deletes ALL existing entries
    return knex("Reviews")
        .del()
        .then(() => knex.batchInsert("Reviews", data))
        .then(() => knex.raw("SELECT setval(pg_get_serial_sequence('\"Reviews\"', 'review_id'), (SELECT max(\"review_id\") FROM \"Reviews\") + 1);"));;
};