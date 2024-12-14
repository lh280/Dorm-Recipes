import Model from "objection";
import BaseModel from "./BaseModel";
// import User from "./User";

export default class Recipe extends BaseModel {
  static get tableName() {
    return "Recipes";
  }

  static get modifiers() {
    return {
      onlyTitle(query) {
        query.select('recipe_id', 'title');
      }
    };
  }

  static get relationMappings() {
    const Ingredient = require("./Ingredient").default; //eslint-disable-line
    const Review = require("./Review").default; //eslint-disable-line
    const Recipe_Ingredients = require("./Recipe_Ingredients").default; //eslint-disable-line

    return {
      ingredients_used: {
        relation: Model.ManyToManyRelation,
        modelClass: Ingredient, // eslint-disable-line no-use-before-define
        join: {
          from: "Recipes.recipe_id",
          through: {
            // Recipe_Ingredients is the join table. These names must match the schema
            from: "Recipe_Ingredients.recipe_id",
            to: "Recipe_Ingredients.ingredient_id",
          },
          to: "Ingredients.ingredient_id",
        },
      },
      recipe_reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review, // eslint-disable-line no-use-before-define
        join: {
          from: "Recipes.recipe_id",
          to: "Reviews.recipe_id",
        },
      },
      recipe_ingredient: {
        relation: Model.HasManyRelation,
        modelClass: Recipe_Ingredients, //eslint-disable-line
        join: {
          from: 'Recipes.recipe_id',
          to: 'Recipe_Ingredients.recipe_id',
        },
      },
      // recipe_user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User, // eslint-disable-line no-use-before-define
      //   join: {
      //     from: "Recipes.user_id",
      //     to: "Users.user_id",
      //   },
      // },

    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "id"],
      properties: {
        recipe_id: { type: "integer" },
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 100 },
        description: { type: "string" },
        instructions: { type: "string" },
        prep_time: { type: "integer", minimum: 1 },
        servings: { type: "integer", minimum: 1 },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}