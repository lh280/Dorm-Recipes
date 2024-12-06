import { useRouter } from "next/router";
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

  const router = useRouter();
  const { id } = router.query; 

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

  const handleDelete = () => { // TODO: integrate authorization with delete handling
    // eslint-disable-next-line no-restricted-globals 
    const result = confirm("Are you sure you want to delete this recipe?"); // eslint-disable-line no-alert
    if (result && id) {
      fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete recipe");
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-alert
          alert("Recipe deleted successfully");
          router.back();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error deleting recipe:", error);
        });
    } 
    else if (!id) {
      // eslint-disable-next-line no-alert
      alert("No such recipe found: returning to homepage");
      router.back(); // Go back if no id found
    }
  };

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
      <Button variant="contained" onClick={handleDelete}>
        Delete Recipe
      </Button> {/* TODO: integrate authorization to only show delete button to recipe owner */}
    </>
  );
}

RecipeView.propTypes = {
  currentRecipe: RecipeShape,
  setCurrentRecipe: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(RatingShape),
  currentUser: UserShape,
  viewAccount: PropTypes.func
};