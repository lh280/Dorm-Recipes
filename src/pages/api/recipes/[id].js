import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import onError from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const recipeID = parseInt(req.query.id, 10);
    try {
      const recipe = await Recipe.query()
        .where('recipe_id', recipeID)
        .withGraphFetched("ingredients_used")
        .first()
        .throwIfNotFound();
      res.status(200).json(recipe);
    } catch (error) {
      res.status(404).json({ error: "Recipe not found" });
    }
  })

  .put(async (req, res) => {
    // PUT endpoint for editing a single recipe
    try {
      const { id, ...updatedRecipe } = req.body;
      if (id !== parseInt(req.query.id, 10)) {
        res.status(400).end(`URL and object does not match`);
        return;
      }
      const updatedRecord = await Recipe.query().updateAndFetchById(
        id,
        updatedRecipe,
      );
      res.status(200).json(updatedRecord);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to update the recipe" });
    }
  });

export default router.handler({ onError });
