import { createRouter } from "next-connect";
import { onError, authenticated } from "@/lib/middleware";
import RecipeIngredient from "../../../../models/Recipe_Ingredients";

/* eslint-disable consistent-return */
const router = createRouter();

router
  .post(authenticated, async (req, res) => {
    const { recipe_id, ingredient_id, quantity, unit } = req.body;

    if (!recipe_id || !ingredient_id || !quantity || !unit) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Get the current max ingredient_id and increment
    const maxIngredient = await RecipeIngredient.query().max("ingredient_id as max_id").first();
    const newIngredientId = (maxIngredient?.max_id || 0) + 1;

    try {
      const newRecipeIngredient = await RecipeIngredient.query().insertAndFetch({
        recipe_id,
        ingredient_id: newIngredientId,
        quantity,
        unit,
      });

      return res.status(201).json(newRecipeIngredient);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error linking ingredient to recipe:", error);
      res.status(500).json({ error: "Failed to link ingredient to recipe." });
    }
  });

export default router.handler({ onError });
