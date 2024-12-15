import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Editor from "@/components/Editor";

export default function AddRecipe() {
  const router = useRouter();
  const { data: session } = useSession({ required: true }); // eslint-disable-line no-unused-vars

  const handleComplete = async (recipe) => {
    if (recipe) {
      const recipePayload = {
        title: recipe.title,
        description: recipe.description,
        prep_time: recipe.time,
        servings: recipe.servings,
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
          const ingredientPromises = recipe.ingredients.map(async (ingredient) => {
            try {
              const ingredientResponse = await fetch("/api/ingredient", {
                method: "POST",
                body: JSON.stringify({
                  name: ingredient.name, // Save the ingredient name
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              if (!ingredientResponse.ok) {
                const errorText = await ingredientResponse.text();
                // eslint-disable-next-line no-console
                console.error("Ingredient API error:", errorText);
                throw new Error("Failed to save ingredient");
              }
              // eslint-disable-next-line no-console
              const ingredientData = await ingredientResponse.json();

              const recipeIngredientResponse = await fetch("/api/recipe_ingredients", {
                method: "POST",
                body: JSON.stringify({
                  recipe_id: recipeData.recipe_id, // From the saved recipe
                  ingredient_id: ingredientData.ingredient_id, // From saved ingredient
                  quantity: Number(ingredient.quantity), // Optional - must be a number
                  unit: ingredient.unit, // Optional
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              if (!recipeIngredientResponse.ok) {
                const errorText = await recipeIngredientResponse.text();
                // eslint-disable-next-line no-console
                console.error("Recipe Ingredient API error:", errorText);
                throw new Error("Failed to save recipe ingredient");
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error("Error with ingredient:", ingredient.name, error);
              throw error;
            }
          });

          await Promise.all(ingredientPromises);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Ingredient linking failed:", error);
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
      router.push("/"); // Navigate to home if the user cancels
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
