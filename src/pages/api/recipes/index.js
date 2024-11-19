import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import onError from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ message: "Search parameter is required." });
      }

      // search in both title and ingredients
      const recipes = await Recipe.query()
        .where('title', "ilike", `%${query}%`)
        .orWhere('ingredients', "ilike", `%${query}%`); // TODO: check w DB people how to search the ingredients

      if (recipes.length === 0) {
        return res.status(404).json({ message: "No recipes found matching the criteria." });
      }

      return res.status(200).json(recipes);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch recipes." });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, description, ingredients, steps } = req.body;

      if (!title || !description || !ingredients || !steps) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newRecipe = await Recipe.query().insertAndFetch({
        title,
        description,
        ingredients,
        steps,
      });
      
      return res.status(201).json(newRecipe);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ error: "Failed to create recipe" });
    }
  });

export default router.handler({ onError });
