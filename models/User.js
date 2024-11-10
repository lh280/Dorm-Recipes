/* eslint-disable camelcase */
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static get idColumn() {
    return "user_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        user_id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 50 },
        created_at: { type: "string", format: "date-time" },
      },
    };
  }

  userDetails() {
    return {
      user_id: this.user_id,
      username: this.username,
      created_at: this.created_at,
    };
  }
}
