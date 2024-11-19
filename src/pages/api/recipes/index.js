import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
// import Ingredient from "../../../../models/Ingredient"
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
        .withGraphFetched('ingredients_used') // Fetch related ingredients
        .where((builder) => {
          builder
            .where('title', 'ilike', `%${query}%`)
            .orWhereExists(
              Recipe.relatedQuery('ingredients_used')
                .where('ingredient_name', 'ilike', `%${query}%`)
            );
        });

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
    // eslint-disable-next-line 
    const { title, description, prep_time, instructions } = req.body;
    // Validate the required fields
    // eslint-disable-next-line
    if (!title || !description || !prep_time || !instructions) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save the recipe to the database
    const newRecipe = await Recipe.query().insertAndFetch({
      title,
      description,
      // eslint-disable-next-line 
      prep_time,
      instructions,
    });
    
    // eslint-disable-next-line no-console
    console.log("Recipe successfully saved:", newRecipe); // Log the saved recipe
    return res.status(201).json(newRecipe);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving recipe:", error);
    return res.status(500).json({ error: "Failed to create recipe" });
  }
});

export default router.handler({ onError });