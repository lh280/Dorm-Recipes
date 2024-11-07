/*
  RecipesView.js

  This module displays a list of recipes and reports when a user clicks on one.

  props:
    recipes - an array of search-relevant recipe objects
    setCurrentRecipe - a callback that expects a recipe as an argument

*/

import Image from "next/image";
import PropTypes from "prop-types";
import RecipeShape from "./RecipeShape";

export default function RecipesView({ recipes, setCurrentRecipe }) {
  // map the sorted titles to html elements
  const recipesDisplay = recipes.map((rec) => (
    <div
      class="container"
      data-testid="recipe"
      key={rec.id}
      onClick={() => setCurrentRecipe(rec)}
    >
      <Image src={rec.img} width="50" height="50" />
      <div class="container__text">
        <div class="container__text__rating">
          <p>{rec.rating}</p>
        </div>
        <h1>{rec.title}</h1>
        <p>{rec.author}</p>
        <div class="container__text__timer">
          <p>{rec.time}</p>
        </div>
        <p>{rec.edited}</p>
      </div>
    </div>
  ));

  return <div>{recipesDisplay}</div>;
}

RecipesView.propTypes = {
  recipes: RecipeShape,
  setCurrentRecipe: PropTypes.func.isRequired,
};
