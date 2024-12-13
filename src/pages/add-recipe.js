import { useRouter } from "next/router";
import Head from "next/head";
import Editor from "@/components/Editor";

export default function AddRecipe() {
  const router = useRouter();

  const handleComplete = (recipe) => {
    if (recipe) {
      const recipePayload = {
        title: recipe.title,
        description: recipe.description,
        prep_time: recipe.time,
        instructions: recipe.steps.join("\n"),
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
          alert("Recipe saved successfully!");
          router.push(`/recipes/${newRecipe.recipe_id}`);
        })
        .catch((error) => {
          console.error("Error saving recipe:", error);
          alert("Failed to save the recipe. Please try again.");
        });
    } else {
      router.back();
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
