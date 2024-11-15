// /* eslint-disable func-names */
// /* eslint no-unused-vars: ["error", { "args": "none" }] */
// const fs = require("fs");

// exports.seed = function (knex) {
//     const contents = fs.readFileSync("./db/seed/usersSeed.json");
//     const data = JSON.parse(contents);

//     // Deletes ALL existing entries
//     return knex("Users")
//         .del()
//         .then(() => knex.insert("Users", data));
// };