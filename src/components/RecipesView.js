/*
  RecipesView.js

  This module displays a list of recipes and reports when a user clicks on one.

  props:
    recipes - an array of search-relevant recipe objects
    setCurrentRecipe - a callback that expects a recipe as an argument

*/
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Image from "next/image";
import PropTypes from "prop-types";
import RecipeShape from "./RecipeShape";

/* 
  TODO: 
  fix 
    "Failed prop type: The prop `recipes[0].recipe_id` is marked as required in `RecipesView`, but its value is `undefined`."" 
    and "Warning: Failed prop type: The prop `setCurrentRecipe` is marked as required in `RecipesView`, but its value is `undefined`."
    and "Warning: Received `true` for a non-boolean attribute `item`."
*/

export default function RecipesView({ recipes, setCurrentRecipe }) { 
  // map the sorted titles to html elements
  const recCards = [...recipes].map((rec) => (
    <Grid item xs={12} sm={6} md={3} key={rec.id} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        key={rec.id}
        onClick={() => {setCurrentRecipe(rec.recipe_id)}}
        variant="outlined"
        data-testid="recipe"
        sx={{ 
          maxWidth: 450, 
          width: "100%",
          "&:hover": {
              backgroundColor: "action.hover", 
              boxShadow: 3, 
          } }}
      >
        <CardActionArea>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
              <Image src={(rec.img ? rec.img : "/food.jpg")} width={200} height={200} alt="Picture of the recipe"/>
            </Box>
            <Typography textAlign="center" 
              variant="h6" 
              sx={{ 
                maxWidth: 200, 
                whiteSpace: "normal", // allows wrapping
                overflowWrap: "break-word", // break long words to fit in card
                wordBreak: "break-word", 
                margin: "0 auto" // center-align in container
              }}>
                {rec.title}
              </Typography>
            {/* TODO: add: rating, prep_time?, servings? author?, part of description?, updated_at? */}
          </CardContent>
        </CardActionArea>
      </Card>
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
  setCurrentRecipe: PropTypes.func.isRequired    
}
