import { useRouter } from "next/router";
import Head from "next/head";

import Editor from "@/components/Editor";

export default function AddRecipe() {
  const router = useRouter();

  const handleComplete = (recipe) => {
    if (recipe) {
      // Prepare the recipe object
      const recipePayload = {
        title: recipe.title,
        description: recipe.description,
        prep_time: recipe.time, // Ensure the prep_time is sent correctly
        instructions: recipe.steps.join("\n"), // Convert steps array to string
      };

      fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(recipePayload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save recipe");
          return response.json();
        })
        .then((newRecipe) => {
          // eslint-disable-next-line no-alert
          alert("Recipe saved successfully!");
          router.push(`/recipes/${newRecipe.id}`);
          router.push(`/recipes/${newRecipe.recipe_id}`); // Navigate to the new recipe
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error saving recipe:", error);
          // eslint-disable-next-line no-alert
          alert("Failed to save the recipe. Please try again.");
        });
    } else {
      router.back(); // Go back if canceled
    }
  };

  return (
    <div>
      <Head>
        <title>Dorm Recipes | Add recipe</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Editor complete={handleComplete} />
      </main>
    </div>
  );
}