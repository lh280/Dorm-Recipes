import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
// import Ingredient from "../../../../models/Ingredient"
import onError from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    try {
      const { q } = req.query; // TODO (maybe): parse query by: spaces, symbols

      if (!q) {
        return res.status(400).json({ message: "Search parameter is required." });
      }

      // search in both title and description and ingredients
      const recipes = await Recipe.query()
        .withGraphFetched('ingredients_used')
        .where('title', 'ilike', `%${q}%`)
        .orWhere('description', 'ilike', `%${q}%`) 
        .orWhereExists(
          Recipe.relatedQuery('ingredients_used')
            .where('ingredient_name', 'ilike', `%${q}%`))
      
      if (recipes.length === 0) {
        return res.status(404).json({ message: "No recipes found matching the criteria." });
      }

      // Convert binary images to Base64 strings for each recipe
      const formattedRecipes = recipes.map((recipe) => {
        if (recipe.image) {
          recipe.image = recipe.image.toString("base64");
        }
        return recipe;
      });

      return res.status(200).json(formattedRecipes);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch recipes." });
    }
  })
  .post(async (req, res) => {
  try {
    // eslint-disable-next-line 
    const { title, description, prep_time, instructions, image } = req.body;

    // Validate the required fields
    // eslint-disable-next-line
    if (!title || !description || !prep_time || !instructions) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // eslint-disable-next-line
    if (image && typeof image !== "string") {
      return res.status(400).json({ message: "Invalid image format. Must be a Base64 string." });
    }

    // Convert Base64 image string to binary if provided
    let imageBinary = null;
    if (image) {
      imageBinary = Buffer.from(image, "base64");
    }

    // Save the recipe to the database
    const newRecipe = await Recipe.query().insertAndFetch({
      title,
      description,
      prep_time,
      instructions,
      image: imageBinary,
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