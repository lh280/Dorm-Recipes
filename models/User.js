/* eslint-disable camelcase */
import Model from "objection";
import BaseModel from "./BaseModel";
import Pantry from "./Pantry"
import Review from "./Review"
import Recipe from "./Recipe"

export default class User extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static relationMappings = {
    Pantry_items: {
      relation: Model.OneToManyRelation,
      modelClass: Pantry, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        through: {
          // Pantry is the join table. These names must match the schema
          from: "Pantry.user_id",
          to: "Pantry.ingredient_id",
        },
        to: "Pantry.ingredient_id",
      },
    },
    User_reviews: {
      relation: Model.OneToManyRelation,
      modelClass: Review, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        through: {
          // Review is the join table. These names must match the schema
          from: "Review.user_id",
          to: "Review.review_id",
        },
        to: "Review.review_id",
      },
    },
    User_Recipes: {
      relation: Model.OneToManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        through: {
          // Review is the join table. These names must match the schema
          from: "Recipe.user_id",
          to: "Recipe.recipe_id",
        },
        to: "Recipe.recipe_id",
      },
    },
    
  };

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
