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
  })

  .delete(async (req, res) => {
    try {
      const { id } = req.query;

      // check if recipe exists before deletion
      const recipe = await Recipe.query().findById(id);
      if (!recipe) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }

      // delete the recipe
      await Recipe.query().deleteById(id);
      res.status(200).json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to delete the recipe" });
    }
  });

export default router.handler({ onError });
