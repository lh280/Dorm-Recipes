/* eslint-disable camelcase */
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "user_id"],
      properties: {
        user_id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        created_at: { type: "string", format: "date-time" },
      },
    };
  }
}
