import { useRouter } from "next/router";
import PropTypes from "prop-types";
import RecipeShape from "../../components/RecipeShape";
import Recipe from "../../components/Recipe";

export default function RecipeView({ currentRecipe }) {
    return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Recipe currentRecipe = {currentRecipe} />
    </>
    );
}

RecipeView.propTypes = {
    currentRecipe: RecipeShape.isRequired,
};