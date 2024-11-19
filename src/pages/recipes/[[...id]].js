import PropTypes from "prop-types";
import { Button } from "@mui/material";
import UserShape from "@/components/UserShape";
import RecipeShape from "../../components/RecipeShape";
import RatingShape from "../../components/RatingShape";
import Recipe from "../../components/Recipe";
import Header from "../../components/Header";

export default function RecipeView({
  currentRecipe,
  setCurrentRecipe,
  ratings,
  currentUser,
  viewAccount
}) {

  // URL copier
  function shareRecipe() {
    const url = window.location.href;
    try {
      navigator.clipboard.writeText(`${url}`);
      // eslint-disable-next-line no-alert
      alert("Recipe link copied to clipboard !");
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert("Unable to copy URL :(");
    }
  }

  return (
    <>
      <div>
        <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={viewAccount}/>
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </div>
      <Recipe currentRecipe={currentRecipe} ratings={ratings} />
      <Button variant="contained" onClick={() => { shareRecipe() }}>Share Recipe !</Button>
    </>
  );
}

RecipeView.propTypes = {
  currentRecipe: RecipeShape,
  setCurrentRecipe: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(RatingShape).isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};