/*
  RecipesView.js

  This module displays a list of recipes and reports when a user clicks on one.

  props:
    recipes - an array of search-relevant recipe objects
    setCurrentRecipe - a callback that expects a recipe as an argument

*/
import PropTypes from "prop-types";

import Grid from '@mui/material/Grid2';

import RecipeShape from "./RecipeShape";
import RecipeCard from './RecipeCard';

/* 
  TODO: 
  fix 
    "Failed prop type: The prop `recipes[0].recipe_id` is marked as required in `RecipesView`, but its value is `undefined`."" 
    and "Warning: Failed prop type: The prop `setCurrentRecipe` is marked as required in `RecipesView`, but its value is `undefined`."
    and "Warning: Received `true` for a non-boolean attribute `item`."
*/

export default function RecipesView({ recipes, setCurrentRecipe }) { 
  if (!recipes) {
      return (
        <p>Loading...</p>
    );
  }
  
  // map the sorted titles to html elements 
  const recCards = [...recipes].map((rec) => (
    <Grid item xs={12} sm={6} md={3} key={rec.id} sx={{ display: "flex", justifyContent: "center" }}>
      <RecipeCard recipe={rec} setCurrentRecipe={setCurrentRecipe}/>
    </Grid>
  ));
  return (
    <div id="image list">
      <Grid container spacing={2}> 
        {recCards}
      </Grid>
    </div>
  );
}

RecipesView.propTypes = {
  recipes: PropTypes.arrayOf(RecipeShape).isRequired,
  setCurrentRecipe: PropTypes.func    
}
