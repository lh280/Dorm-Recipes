/*
  RecipesView.js

  This module displays a list of recipes and reports when a user clicks on one.

  props:
    recipes - an array of search-relevant recipe objects
    setCurrentRecipe - a callback that expects a recipe as an argument

*/
import PropTypes from "prop-types";

import { useTheme, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';

import RecipeShape from "./RecipeShape";
import RecipeCard from './RecipeCard';

export default function RecipesView({ recipes, setCurrentRecipe }) {

  const mTheme = useTheme();
  const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));

  if (!recipes) {
    return (
      <p>Loading...</p>
    );
  }

  // map the sorted titles to html elements 
  const recCards = [...recipes].map((rec) => (
    <Grid item xs={6} sm={6} md={3} key={rec.id} sx={{ display: "flex", justifyContent: "center" }}>
      <RecipeCard recipe={rec} setCurrentRecipe={setCurrentRecipe} size={isMobile ? 125 : 200} />
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
