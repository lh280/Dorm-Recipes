import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
// eslint-disable-next-line import/no-duplicates
import onError from "../../../lib/middleware";
// eslint-disable-next-line import/no-duplicates
import { authenticated } from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const recipeID = parseInt(req.query.id, 10);
    try {
      const recipe = await Recipe.query()
        .where('recipe_id', recipeID)
        .withGraphFetched("[ingredients_used, recipe_reviews, recipe_ingredient]")
        .first()
        .throwIfNotFound();
      res.status(200).json(recipe);
    } catch (error) {
      res.status(404).json({ error: "Recipe not found" });
    }
  })

  .put(authenticated, async (req, res) => {
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

  .delete(authenticated, async (req, res) => {
    const recipeID = parseInt(req.query.id, 10);
    try {
      // check if recipe exists before deletion
      const recipe = await Recipe.query()
        .where('recipe_id', recipeID)
        .withGraphFetched("ingredients_used")
        .first()
        .throwIfNotFound();
        res.status(200).json(recipe);
      } catch (error) {
        res.status(404).json({ error: "Recipe not found" });
      }

    try {
      // delete the recipe
      await Recipe.query()
        .delete()
        .where('recipe_id', recipeID)
        .throwIfNotFound();
      res.status(200).json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to delete the recipe" });
    }
  });

export default router.handler({ onError });
