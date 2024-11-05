/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import User from "./User";
import Recipe from "./Recipe";

export default class Review extends BaseModel {
  static get tableName() {
    return "recipe_ratings";
  }

  static relationMappings = {
    // User who made the review
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "recipe_ratings.user_id",
        to: "users.user_id",
      },
    },

    // Recipe being reviewed
    recipe: {
      relation: Model.BelongsToOneRelation,
      modelClass: Recipe,
      join: {
        from: "recipe_ratings.recipe_id",
        to: "recipes.recipe_id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["recipe_id", "user_id", "rating"],

      properties: {
        rating_id: { type: "integer" },
        recipe_id: { type: "integer" },
        user_id: { type: "integer" },
        rating: { type: "integer", minimum: 1, maximum: 5 },
        comment: { type: "string" },
        created_at: {
          type: "string",
          format: "date-time",
        },
      },
    };
  }

  static get idColumn() {
    return "rating_id";
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "rating_id",
          "recipe_id",
          "user_id",
          "rating",
          "comment",
          "created_at"
        );
      },
      orderByRecent(builder) {
        builder.orderBy("created_at", "desc");
      },
      withUserDetails(builder) {
        builder
          .select("recipe_ratings.*", "users.username")
          .join("users", "recipe_ratings.user_id", "users.user_id");
      },
    };
  }
}