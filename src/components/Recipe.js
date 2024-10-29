/* 
  Recipe.js

  The Recipe displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
import RecipeShape from "./RecipeShape";

export default function Recipe({ currentRecipe }) {
    const editDate = new Date(currentRecipe.edited).toLocaleString();
    return (
        <div>
            <h2>{currentRecipe.title}</h2>
            <p>{currentRecipe.time}</p>
            <p>{currentRecipe.ingredients}</p>
            <p>{currentRecipe.steps}</p>
            <p>{editDate}</p>
        </div>
    );
}

Recipe.propTypes = {
    currentRecipe: RecipeShape.isRequired,
};