import Model from "objection";
import BaseModel from "./BaseModel";

const Recipe = require("./Recipe");

export default class Ingredient extends BaseModel {
  static get tableName() {
    return "Ingredients";
  }

  static relationMappings = {
    recipes: {
      relation: Model.ManyToManyRelation,
      modelClass: Recipe,
      join: {
        from: "Ingredients.ingredient_id",
        through: {
          from: "Recipe_Ingredients.ingredient_id",
          to: "Recipe_Ingredients.recipe_id"
        },
        to: "Recipe.recipe_id"
      },
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["ingredient_name", "ingredient_id"],
      properties: {
        ingredient_id: { type: "integer" },
        ingredient_name: { type: "string" },
      },
    };
  }

  // to use this model as a relation in other models, idColumn getter
  static get idColumn() {
    return "ingredient_id";
  }
}
