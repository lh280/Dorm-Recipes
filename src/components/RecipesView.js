/*
  RecipesView.js

  This module displays a list of recipes and reports when a user clicks on one.

  props:
    recipes - an array of search-relevant recipe objects
    setCurrentRecipe - a callback that expects a recipe as an argument

*/
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from "next/image";
import PropTypes from "prop-types";
import RecipeShape from "./RecipeShape";

export default function RecipesView({ recipes, setCurrentRecipe }) { 
  // map the sorted titles to html elements
  const recCards = [...recipes].map((rec) => (
    <Card
      key={rec.id}
      onClick={() => {setCurrentRecipe(rec.recipe_id)}}
      variant="outlined"
      data-testid="recipe"
    >
      <CardActionArea>
        <CardContent>
          <Image src={(rec.img ? rec.img : "/food.jpg")} width={200} height={200} alt="Picture of the recipe"/>
          <Typography textAlign="center" variant="h6">{rec.title}</Typography>
          {/* TODO: add: rating, prep_time?, servings? author?, part of description?, updated_at? */}
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
      <div id="image list">
        <Stack direction="row" spacing={2}> 
          {recCards}
        </Stack>
      </div>
  );
}

RecipesView.propTypes = {
  recipes: PropTypes.arrayOf(RecipeShape).isRequired,
  setCurrentRecipe: PropTypes.func.isRequired    
}
