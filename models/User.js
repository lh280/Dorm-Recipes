/* eslint-disable camelcase */
import Model from "objection";
import BaseModel from "./BaseModel";
import Ingredient from "./Ingredient";
import Review from "./Review";
import Recipe from "./Recipe";

export default class User extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static async getNextUserId() {
    const maxId = await this.query().max("id as max").first();
    return (maxId?.max || 0) + 1; // Increment the highest id found or start from 1
  }

  static async insertUser(data) {
    // Generate the next user_id
    const nextId = await this.getNextUserId();

    // Add the generated user_id to the data
    const newData = { ...data, id: nextId };

    // Insert the new user
    return await this.query().insertAndFetch(newData);
  }

  // Use a function for relationMappings to avoid circular dependency issues
  static relationMappings = () => ({
    pantry_items: {
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.id",
        through: {
          // Pantry is the join table. These names must match the schema
          from: "Pantry.id",
          to: "Pantry.ingredient_id",
          extra: {
            unit: "unit",
            quantity: "quantity",
          },
        },
        to: "Ingredients.ingredient_id",
      },
    },
    user_reviews: {
      relation: Model.HasManyRelation,
      modelClass: Review, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.id",
        to: "Reviews.id",
      },
    },
    user_recipes: {
      relation: Model.HasManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.id",
        to: "Recipes.id",
      },
    },
  });

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"/*, "user_id"*/], // TODO: un-comment out
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        created_at: { type: "string", format: "date-time" },
      },
    };
  }
}
