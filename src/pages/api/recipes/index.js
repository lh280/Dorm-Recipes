import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import onError from "../../../lib/middleware";
import { getSession } from "next-auth/react";

const router = createRouter();

router
  .get(async (req, res) => {
    try {
      const { q } = req.query; // TODO (maybe): parse query by: spaces, symbols

      if (!q) {
        return res.status(400).json({ message: "Search parameter is required." });
      }

      const terms = q
        .replace(/&/g, "and") // replace & with "and"
        .trim()
        .split(/\s+/) // split by spaces 
        .map(term => term.replace(/[^\w]+/g, "")) // remove symbols/characters
        .filter(term => term);

      if (terms.length === 0) {
        return res.status(400).json({ message: "Invalid search parameter." });
      }

      // search in title, description, and ingredients
      const recipes = await Recipe.query()
        .withGraphFetched('ingredients_used')
        .where(builder => {
          terms.forEach(term => {
            builder.andWhere(subBuilder => {
              subBuilder.orWhere('title', 'ilike', `%${term}%`)
              .orWhere('description', 'ilike', `%${term}%`)
              .orWhereExists(
                Recipe.relatedQuery('ingredients_used')
                  .where('ingredient_name', 'ilike', `%${term}%`)
              );
            });
          });
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
    const session = await getSession({ req });
    // eslint-disable-next-line no-console
    console.log("Session Debug:", session);
    // eslint-disable-next-line no-console
    console.log("Session in /api/recipes:", session);

  
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = session.user; // Retrieve user ID from session
    // eslint-disable-next-line no-console
    console.log("User ID from session:", id);
    const { title, description, prep_time, instructions } = req.body;

    // Validate the required fields
    // eslint-disable-next-line
    if (!title || !description || !prep_time || !instructions ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Get the current max recipe_id and increment
    const maxRecipe = await Recipe.query().max("recipe_id as max_id").first();
    const newRecipeId = (maxRecipe?.max_id || 0) + 1;

    // Insert the new recipe
    const newRecipe = await Recipe.query().insert({
      recipe_id: newRecipeId,
      title,
      description,
      prep_time,
      instructions,
      user_id: id, // Use ID from the session
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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