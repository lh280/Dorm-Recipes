/*
    RecipeEditor component

    this component helps to edit currentRecipe
*/
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";

import RecipeShape from "@/components/RecipeShape";
import Editor from "@/components/Editor";

export default function RecipeEditor({ currentRecipe, setCurrentRecipe }){
    const router = useRouter();

    const handleComplete = async (updatedRecipe) => {
        if (!updatedRecipe) {
          router.back();
          return;
        }
    
        try {
            const response = await fetch(`/api/recipes/${updatedRecipe.id}`, {
              method: "PUT",
              body: JSON.stringify(updatedRecipe),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error("Failed to update the recipe.");
            }
      
            const updated = await response.json();
      
            setCurrentRecipe(updated);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error updating recipe: ", error);
          }
        };

        return (
            <div>
              <Head>
                <title>Dorm Recipes | Recipe edit</title>
                <meta name="Dorm Recipes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </Head>
              <Editor
                key={currentRecipe?.id}
                currentRecipe={currentRecipe}
                complete={handleComplete}
              />
            </div>
          );
}

RecipeEditor.propTypes = {
    setCurrentRecipe: PropTypes.func.isRequired,
    currentRecipe: RecipeShape,
  };