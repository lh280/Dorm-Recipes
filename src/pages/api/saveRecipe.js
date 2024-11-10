export default async function handler(req, res) {
    if (req.method === "POST") {
      const { title, description, ingredients, steps } = req.body;
  
      // Perform any data validation here
      if (!title || !description || !ingredients || !steps) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const newRecipe = {
        id: Date.now(),
        title,
        description,
        ingredients,
        steps,
      };
  
      // Respond with the saved recipe (or store in a database instead)
      return res.status(201).json({ message: "Recipe saved successfully!", recipe: newRecipe });
    }
  
    // Return a 405 status if the method is not POST
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  