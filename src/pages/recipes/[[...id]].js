import PropTypes from "prop-types";
import RecipeShape from "../../components/RecipeShape";
import RatingShape from "../../components/RatingShape";
import Recipe from "../../components/Recipe";
import Header from "../../components/Header";

export default function RecipeView({
  currentRecipe,
  setCurrentRecipe,
  ratings,
}) {
  return (
    <>
      <div>
        <Header setCurrentRecipe={setCurrentRecipe} />
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </div>
      <Recipe currentRecipe={currentRecipe} ratings={ratings} />
    </>
  );
}

RecipeView.propTypes = {
  currentRecipe: RecipeShape,
  setCurrentRecipe: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(RatingShape).isRequired,
};
