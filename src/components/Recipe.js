/* 
  Recipe.js

  Displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
import Image from "next/image";
import RecipeShape from "./RecipeShape";

function parseInstructions(instructions) {
  const sentenceRegex = /([.])\s*/;

  // Split the paragraph by sentence-ending punctuation (., !, or ?) and retain the punctuation mark.
  const sentences = instructions.split(sentenceRegex)
                             .filter(Boolean)  // Remove any empty strings that may appear
                             .map((sentence, index, array) => {
                               // Combine the sentence with its punctuation if it's not the last part
                               if (index % 2 === 0) {
                                 return sentence.trim() + (array[index + 1] || '');
                               }
                               return null;
                             })
                             .filter(Boolean); // Filter out nulls
  return sentences;
}

export default function Recipe({ currentRecipe }) {
  if (!currentRecipe) {
    return <h2>Loading...</h2>
  }
  const editDate = new Date(currentRecipe.updated_at).toLocaleString();
  /*
  const ings = currentRecipe.ingredients.map((ing) => (
    <li key={ing} data-test-id="ingredient">
      {ing}
    </li>
  ));
  */
  const sentences = parseInstructions(currentRecipe.instructions);
  const steps = sentences.map((stp) => (
    <li key={stp} data-test-id="step">
      {stp}
    </li>
  ));
  return ( // TODO: Re-add: ratings, ingredients
    <div>
      <h2>{currentRecipe.title}</h2>
      <h3>{currentRecipe.description}</h3>
      <Image src="/food.jpg" width="400" height="400" />
      <p>Prep time: {currentRecipe.prep_time} min</p>
      <p>Servings: {currentRecipe.servings}</p>
      <div>
        <h3>Instructions</h3>
        <ul>{steps}</ul>
      </div>
      <p>Last edited: {editDate}</p>
    </div>
  );
}

Recipe.propTypes = {
  currentRecipe: RecipeShape
};
