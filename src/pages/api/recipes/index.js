import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import { onError } from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    let query = Recipe.query();
    if (req.query.section) {
      query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = ?", [
        req.query.section,
      ]);
    }
    const recipes = await query;
    return res.status(200).json(recipes);
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
