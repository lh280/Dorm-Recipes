/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";

export default class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static relationMappings = {
    // User's recipes
    recipes: {
      relation: Model.HasManyRelation,
      modelClass: Recipe,
      join: {
        from: "users.user_id",
        to: "recipes.user_id",
      },
    },

    // User's pantry ingredients
    pantryIngredients: {
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient,
      join: {
        from: "users.user_id",
        through: {
          from: "user_pantry.user_id",
          to: "user_pantry.ingredient_id",
          extra: ["quantity", "unit", "last_updated"],
        },
        to: "ingredients.ingredient_id",
      },
    },

    // Recipes rated by user
    ratedRecipes: {
      relation: Model.ManyToManyRelation,
      modelClass: Recipe,
      join: {
        from: "users.user_id",
        through: {
          from: "recipe_ratings.user_id",
          to: "recipe_ratings.recipe_id",
          extra: ["rating", "comment", "created_at"],
        },
        to: "recipes.recipe_id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],

      properties: {
        user_id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        created_at: {
          type: "string",
          format: "date-time",
        },
      },
    };
  }

  // Optional: Override the primary key name
  static get idColumn() {
    return "user_id";
  }

  // Optional: Add virtual attributes (properties that don't exist in the database)
  static get virtualAttributes() {
    return ["fullProfile"];
  }

  fullProfile() {
    return {
      userId: this.user_id,
      username: this.username,
      email: this.email,
      createdAt: this.created_at,
      recipeCount: this.$relatedQuery("recipes").resultSize(),
      ratingCount: this.$relatedQuery("ratedRecipes").resultSize(),
    };
  }

  // Optional: Add modifiers for common queries
  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("user_id", "username", "created_at");
      },
      orderByRecent(builder) {
        builder.orderBy("created_at", "desc");
      },
      withoutSensitive(builder) {
        builder.select("user_id", "username", "created_at");
      },
    };
  }
}