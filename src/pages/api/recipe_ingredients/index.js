import { createRouter } from "next-connect";
// eslint-disable-next-line import/no-duplicates
import { authenticated } from "../../../lib/middleware"; 
// eslint-disable-next-line import/no-duplicates
import onError from "../../../lib/middleware";
import RecipeIngredient from "../../../../models/Recipe_Ingredients";

/* eslint-disable consistent-return */
const router = createRouter();

router
  .post(authenticated, async (req, res) => {
    const { recipe_id, ingredient_id, quantity, unit } = req.body;

    if (!recipe_id || !ingredient_id || !quantity || !unit) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const newRecipeIngredient = await RecipeIngredient.query().insertAndFetch({
        recipe_id,
        ingredient_id,
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
