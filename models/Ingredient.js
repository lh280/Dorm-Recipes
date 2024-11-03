import BaseModel from "./BaseModel";

export default class Ingredient extends BaseModel {
  static get tableName() {
    return "Ingredients";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
    };
  }
}
