import { useRouter } from "next/router";
import Head from "next/head";
import Editor from "@/components/Editor";

export default function AddRecipe() {
  const router = useRouter();

  const handleComplete = async (recipe) => {
    if (recipe) {
      const recipePayload = {
        title: recipe.title,
        description: recipe.description,
        prep_time: recipe.time,
        instructions: recipe.steps.join("\n"),
      };

      try {
        // First, save the recipe to get the recipe_id
        const recipeResponse = await fetch("/api/recipes", {
          method: "POST",
          body: JSON.stringify(recipePayload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

  
        if (!recipeResponse.ok) throw new Error("Failed to save recipe");
        const recipeData = await recipeResponse.json();


        
        // Step 2: Save each ingredient and link it to the recipe
        try {
          // Map over the ingredients to create the required promises
          const ingredientPromises = recipe.ingredients.map(async (ingredient) => {
            // Save the ingredient to the Ingredients table
            const ingredientResponse = await fetch("/api/ingredients", {
              method: "POST",
              body: JSON.stringify({
                name: ingredient.name,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
        
            if (!ingredientResponse.ok) throw new Error("Failed to save ingredient");
            const ingredientData = await ingredientResponse.json();
        
            // Link the ingredient to the recipe in Recipe_Ingredients table
            const recipeIngredientResponse = await fetch("/api/recipe_ingredients", {
              method: "POST",
              body: JSON.stringify({
                recipe_id: recipeData.recipe_id,
                ingredient_id: ingredientData.ingredient_id,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
        
            if (!recipeIngredientResponse.ok)
              throw new Error("Failed to save recipe ingredient");
          });
        
          // Use Promise.all to wait for all promises to resolve
          await Promise.all(ingredientPromises);
        } catch (error) {
          throw new Error("Error saving ingredients or linking them to the recipe.");
        }
      

        // Success message
        // eslint-disable-next-line no-alert
        alert("Recipe and ingredients saved successfully!");
        router.push(`/recipes/${recipeData.recipe_id}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving recipe:", error);
        // eslint-disable-next-line no-alert
        alert("Failed to save the recipe. Please try again.");
        }
    } else {
      router.back(); // Navigate back if the user cancels
    }
  };

  return (
    <div>
      <Head>
        <title>Dorm Recipes | Add Recipe</title>
        <meta name="description" content="Add a recipe to Dorm Recipes!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Editor complete={handleComplete} />
      </main>
    </div>
  );
}
