// Model File
import BaseModel from "./BaseModel";

export default class Recipe extends BaseModel {
  static get tableName() {
    return "Recipes";
  }

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

  static get idColumn() {
    return "recipe_id";
  }

  recipeDetails() {
    return {
      recipe_id: this.recipe_id,
      title: this.title,
      description: this.description,
      instructions: this.instructions,
      prep_time: this.prep_time,
      servings: this.servings,
      created_at: this.created_at,
      updated_at: this.updated_at,
      user_id: this.user_id,
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "recipe_id",
          "user_id",
          "title",
          "description",
          "prep_time",
          "servings",
          "created_at",
          "updated_at",
        );
      },
      orderByRecent(builder) {
        builder.orderBy("created_at", "desc");
      },
    };
  }
}
