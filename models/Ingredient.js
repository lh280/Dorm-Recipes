import BaseModel from "./BaseModel";

export default class Ingredient extends BaseModel {
  static get tableName() {
    return "Ingredients";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["ingredient_name"],
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
