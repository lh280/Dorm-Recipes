// Model File
import BaseModel from "./BaseModel";

export default class RecipeIngredient extends BaseModel {
  static get tableName() {
    return "Recipe_ingredients";
  }

  static get idColumn() {
    return ["recipe_id", "ingredient_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["recipe_id", "ingredient_id", "quantity", "unit"],
      properties: {
        recipe_id: { type: "integer" },
        ingredient_id: { type: "integer" },
        quantity: { type: "number", minimum: 1 },
        unit: { type: "string", maxLength: 20 },
      },
    };
  }
}
