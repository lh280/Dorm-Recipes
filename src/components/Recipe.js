/* 
  Recipe.js

  Displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
import { useRouter } from "next/router";
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
  const router = useRouter();
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

  const combinedIngredients = currentRecipe.ingredients_used.map((ingredient) => {
    // Find the corresponding recipe_ingredient entry using the ingredient_id
    const recipeDetails = currentRecipe.recipe_ingredient.find((recIng) => recIng.ingredient_id === ingredient.ingredient_id);

    return {
      ingredient_name: ingredient.ingredient_name,
      ingredient_id: ingredient.ingredient_id,
      quantity: recipeDetails.quantity,
      unit: recipeDetails.unit,
    };
  });

  const handleReturn = (() => {
    router.back();
  })

  return ( 
    <div>
      <button type="button" onClick={handleReturn}>🔙</button>
      <h2>{currentRecipe.title}</h2>
      <h3>{currentRecipe.description}</h3>
      <Image src={(currentRecipe.img ? currentRecipe.img : "/food.jpg")} width="400" height="400" alt="Picture of the recipe"/>
      <p>Prep time: {currentRecipe.prep_time} min</p>
      <p>Servings: {currentRecipe.servings}</p>
      <h2> Ingredients </h2>
      <ul>
        {combinedIngredients.map((ing) => (
          <li key={ing.ingredient_id}>
            {ing.quantity} {ing.unit} of {ing.ingredient_name}
          </li>
        ))}
      </ul>
      <div>
        <h3>Instructions</h3>
        <ul>{steps}</ul>
      </div>
      <p>Last edited: {editDate}</p>
      <h2> Reviews </h2>
      <ul>
        {currentRecipe.recipe_reviews.map((rev) => (
          <li key={rev.review_id}>
            <strong>Rating: {rev.rating/2}</strong> {/* divide by 2 to get # stars */}
            <p>{rev.content}</p>
            <p><small>{Date(rev.created_at).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

Recipe.propTypes = {
  currentRecipe: RecipeShape
};
