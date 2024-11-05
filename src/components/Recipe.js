/* 
  Recipe.js

  Displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
import PropTypes from "prop-types";
import Image from "next/image";
import RecipeShape from "./RecipeShape";
import RatingShape from "./RatingShape";
import Rating from "./Rating";

export default function Recipe({ currentRecipe, ratings }) {
  const editDate = new Date(currentRecipe.edited).toLocaleString();
  const ings = currentRecipe.ingredients.map((ing) => (
    <li key={ing} data-test-id="ingredient">
      {ing}
    </li>
  ));
  const stps = currentRecipe.steps.map((stp) => (
    <li key={stp} data-test-id="step">
      {stp}
    </li>
  ));
  return (
    <div>
      <h2>{currentRecipe.title}</h2>
      <Image src={currentRecipe.img} width="400" height="400" />
      <p>Duration: {currentRecipe.time}</p>
      <Rating ratings={ratings} currentRecipe={currentRecipe} />
      <div>
        <h3>Ingredients</h3>
        <ul>{ings}</ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <ul>{stps}</ul>
      </div>
      <p>Last edited: {editDate}</p>
    </div>
  );
}

Recipe.propTypes = {
  currentRecipe: RecipeShape,
  ratings: PropTypes.arrayOf(RatingShape).isRequired,
};
