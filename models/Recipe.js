// Model File
import { Model } from "objection";
import BaseModel from "./BaseModel";

export default class Recipe extends BaseModel {
  static get tableName() {
    return "Recipes";
  }

  static relationMappings = {
    related: {
      relation: Model.OneToManyRelation,
      modelClass: Recipe, // eslint-disable-line no-use-before-define
      join: {
        from: "Recipes.recipe_id",
        through: {
          // RelatedArticle is the join table. These names must match the schema
          from: "Recipe_Ingredients.recipe_id",
          to: "Recipe_Ingredients.ingredient_id",
        },
        to: "Recipes.recipe_id",
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
        prep_time: { type: "integer", minimum: 1 },
        servings: { type: "integer", minimum: 1 },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}
