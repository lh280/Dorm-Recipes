import PropTypes from "prop-types";
import RecipeShape from "../../components/RecipeShape";
import Recipe from "../../components/Recipe";
import Header from "../../components/Header";

export default function RecipeView({ currentRecipe, setCurrentRecipe }) {
  return (
    <>
      <div>
        <Header setCurrentRecipe={setCurrentRecipe} />
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </div>
      <Recipe currentRecipe={currentRecipe} />
    </>
  );
}

RecipeView.propTypes = {
  currentRecipe: RecipeShape.isRequired,
  setCurrentRecipe: PropTypes.func.isRequired,
};
