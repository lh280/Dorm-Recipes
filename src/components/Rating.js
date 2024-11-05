/* 
  Rating.js

  Displays rating information for a given recipe.

  props:
    ratings - The list of all ratings
    currentRecipe - The recipe whose ratings should be displayed
*/
import PropTypes from "prop-types";
import RatingShape from "./RatingShape";
import RecipeShape from "./RecipeShape";

export default function Rating({ ratings, currentRecipe }) {
  const recRatings = ratings.filter((rat) => rat.recId === currentRecipe.id);
  const myStars = recRatings.find((rat) => rat.userId === 0); // TODO: Replace 0 with the current user's ID
  const stars = recRatings.map((rat) => rat.value);
  const sum = stars.reduce((total, star) => total + star, 0);
  const avgStars = sum / stars.length;
  return (
    <div>
      <h4>User Rating: {myStars.value}</h4>
      <h4>Average Rating: {avgStars}</h4>
    </div>
  );
}

Rating.propTypes = {
  ratings: PropTypes.arrayOf(RatingShape).isRequired,
  currentRecipe: RecipeShape,
};
