import { createRouter } from "next-connect";
import Recipe from "../../../../models/Recipe";
import onError from "../../../lib/middleware";

const router = createRouter();

router.post(async (req, res) => {
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