/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import User from "./User";
import Ingredient from "./Ingredient";

export default class Recipe extends BaseModel {
  static get tableName() {
    return "recipes";
  }

  static relationMappings = {
    // Recipe creator
    creator: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "recipes.user_id",
        to: "users.user_id",
      },
    },

    // Recipe ingredients
    ingredients: {
      relation: Model.ManyToManyRelation,
      modelClass: Ingredient,
      join: {
        from: "recipes.recipe_id",
        through: {
          from: "recipe_ingredients.recipe_id",
          to: "recipe_ingredients.ingredient_id",
          extra: ["quantity", "unit"],
        },
        to: "ingredients.ingredient_id",
      },
    },

    // Recipe ratings
    ratings: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: "recipes.recipe_id",
        through: {
          from: "recipe_ratings.recipe_id",
          to: "recipe_ratings.user_id",
          extra: ["rating", "comment", "created_at"],
        },
        to: "users.user_id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],

      properties: {
        recipe_id: { type: "integer" },
        user_id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 100 },
        description: { type: "string" },
        instructions: { type: "string" },
        preparation_time: { type: "integer", minimum: 0 },
        serving_size: { type: "integer", minimum: 1 },
        created_at: {
          type: "string",
          format: "date-time",
        },
      },
    };
  }

  static get idColumn() {
    return "recipe_id";
  }

  static get virtualAttributes() {
    return ["averageRating", "recipeDetails"];
  }

  async averageRating() {
    const result = await this.$relatedQuery("ratings")
      .avg("rating as avgRating")
      .first();
    return result ? Number(result.avgRating) : null;
  }

  recipeDetails() {
    return {
      recipeId: this.recipe_id,
      title: this.title,
      description: this.description,
      instructions: this.instructions,
      preparationTime: this.preparation_time,
      servingSize: this.serving_size,
      createdAt: this.created_at,
      createdBy: this.user_id,
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "recipe_id",
          "user_id",
          "title",
          "description",
          "preparation_time",
          "serving_size",
          "created_at"
        );
      },
      orderByRecent(builder) {
        builder.orderBy("created_at", "desc");
      },
      withRatings(builder) {
        builder
          .select("recipes.*")
          .select(
            builder.fn.avg("recipe_ratings.rating").as("average_rating"),
            builder.fn.count("recipe_ratings.rating").as("rating_count")
          )
          .leftJoin("recipe_ratings", "recipes.recipe_id", "recipe_ratings.recipe_id")
          .groupBy("recipes.recipe_id");
      },
    };
  }
}