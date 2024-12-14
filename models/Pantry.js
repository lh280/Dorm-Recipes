// Model File
import BaseModel from "./BaseModel";

export default class Pantry extends BaseModel {
  static get tableName() {
    return "Pantry";
  }

  // Composite key
  static get idColumn() {
    return ["id", "ingredient_id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "ingredient_id", "quantity", "unit"],
      properties: {
        id: { type: "integer" },
        ingredient_id: { type: "integer" },
        quantity: { type: "number", minimum: 1 },
        unit: { type: "string", maxLength: 20 },
      },
    };
  }
}
