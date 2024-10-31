// knexfile.js
require('dotenv').config();



module.exports = {
    
  development: {
    client: 'pg',
    connection: {
        connectionString: DATABASE_URL,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  
  production: {
    client: 'pg',
    connection: {
        connectionString: DATABASE_URL,
        ssl: true,
      },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
  }
};

// migrations/YYYYMMDDHHMMSS_initial_schema.js
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('recipes', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.text('instructions');
      table.integer('user_id').references('id').inTable('users');
      table.timestamps(true, true);
    })
    .createTable('recipe_ratings', table => {
      table.increments('id').primary();
      table.integer('recipe_id').references('id').inTable('recipes').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('rating').notNullable();
      table.text('review');
      table.timestamps(true, true);
    })
    .createTable('pantry_items', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('ingredient_name').notNullable();
      table.float('quantity');
      table.string('unit');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('pantry_items')
    .dropTableIfExists('recipe_ratings')
    .dropTableIfExists('recipes')
    .dropTableIfExists('users');
};

