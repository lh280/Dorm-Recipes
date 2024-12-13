import Model from "objection";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe";

const User = require("./User");

export default class Review extends BaseModel {
  static get tableName() {
    return "Reviews";
  }

  // Use a function for relationMappings to avoid circular dependency issues
  static relationMappings = () => ({
    recipes: {
      relation: Model.BelongsToOneRelation,
      modelClass: Recipe,
      join: {
        from: "Reviews.recipe_id",
        to: "Recipes.recipe_id",
      },
    },

    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "Reviews.id",
        to: "Users.id",
      },
    },
  });

  static get jsonSchema() {
    return {
      type: "object",
      required: ["recipe_id", "id", "rating"],
      properties: {
        review_id: { type: "integer" },
        recipe_id: { type: "integer" },
        id: { type: "integer" },
        rating: { type: "integer", minimum: 1, maximum: 10 },
        content: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get idColumn() {
    return "review_id";
  }
}
