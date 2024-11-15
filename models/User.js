/* eslint-disable camelcase */
import Model from "objection";
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "Users";
  }

  static relationMappings = {
    related: {
      relation: Model.OneToManyRelation,
      modelClass: User, // eslint-disable-line no-use-before-define
      join: {
        from: "Users.user_id",
        through: {
          // Pantry is the join table. These names must match the schema
          from: "Pantry.user_id",
          to: "Pantry.ingredient_id",
        },
        to: "Users.user_id",
      },
    },
  };

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
