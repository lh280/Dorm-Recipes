/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModel";
import User from "./User";
import Ingredient from "./Ingredient";

export default class Pantry extends BaseModel {
  static get tableName() {
    return "user_pantry";
  }

  static relationMappings = {
    // User who owns the pantry item
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_pantry.user_id",
        to: "users.user_id",
      },
    },

    // The ingredient in the pantry
    ingredient: {
      relation: Model.BelongsToOneRelation,
      modelClass: Ingredient,
      join: {
        from: "user_pantry.ingredient_id",
        to: "ingredients.ingredient_id",
      },
    },
  };

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
        quantity: { type: "number", minimum: 0 },
        unit: { type: "string", maxLength: 20 },
        last_updated: {
          type: "string",
          format: "date-time",
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(
          "user_pantry.*",
          "ingredients.name as ingredient_name"
        )
        .join("ingredients", "user_pantry.ingredient_id", "ingredients.ingredient_id");
      },
      orderByIngredientName(builder) {
        builder
          .join("ingredients", "user_pantry.ingredient_id", "ingredients.ingredient_id")
          .orderBy("ingredients.name");
      },
      lowQuantity(builder) {
        builder.where("quantity", "<", 1);
      },
      recentlyUpdated(builder) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        builder.where("last_updated", ">=", oneWeekAgo);
      },
    };
  }

  // Helper method to check if quantity is low
  isLowQuantity() {
    return this.quantity < 1;
  }

  // Helper method to update quantity
  async updateQuantity(newQuantity) {
    return await Pantry.query()
      .patch({
        quantity: newQuantity,
        last_updated: new Date().toISOString(),
      })
      .where({
        user_id: this.user_id,
        ingredient_id: this.ingredient_id,
      });
  }

  // Helper method to add/subtract quantity
  async adjustQuantity(amount) {
    const newQuantity = Math.max(0, this.quantity + amount);
    return await this.updateQuantity(newQuantity);
  }
}