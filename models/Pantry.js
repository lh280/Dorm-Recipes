// Model File
import BaseModel from "./BaseModel";

export default class Pantry extends BaseModel {
  static get tableName() {
    return "Pantry";
  }

  // Composite key
  static get idColumn() {
    return ["user_id", "ingredient_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "ingredient_id", "quantity", "unit"],
      properties: {
        user_id: { type: "integer" },
        ingredient_id: { type: "integer" },
        quantity: { type: "number", minimum: 1 },
        unit: { type: "string", maxLength: 20 },
      },
    };
  }
}
