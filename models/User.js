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

  // Use a function for relationMappings to avoid circular dependency issues
  static relationMappings = () => ({
    pantry_items: {
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        through: {
          // Pantry is the join table. These names must match the schema
          from: "Pantry.user_id",
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
        from: "Users.user_id",
        to: "Reviews.user_id",
      },
    },
    user_recipes: {
      relation: Model.HasManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        to: "Recipes.user_id",
      },
    },
  });

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "user_id"],
      properties: {
        user_id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        created_at: { type: "string", format: "date-time" },
      },
    };
  }
}
