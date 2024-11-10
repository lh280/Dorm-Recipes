import BaseModel from "./BaseModel";

export default class Review extends BaseModel {
  static get tableName() {
    return "Reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["recipe_id", "user_id", "rating"],
      properties: {
        review_id: { type: "integer" },
        recipe_id: { type: "integer" },
        user_id: { type: "integer" },
        rating: { type: "integer", minimum: 1, maximum: 10 },
        content: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get idColumn() {
    return "review_id"; // Changed from rating_id
  }

  // Method to format review data
  reviewDetails() {
    return {
      review_id: this.review_id,
      recipe_id: this.recipe_id,
      user_id: this.user_id,
      rating: this.rating,
      content: this.content,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
