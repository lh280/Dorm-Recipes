import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Image from 'next/image';
import PropTypes from 'prop-types';
import RecipeShape from './RecipeShape';

export default function Section(props) {
  const {title, recipes, openRecipe} =  props; // TODO: ASK WHY THIS WORKED AND THE OLD ONE DIDN'T

  const cards = [...recipes].map((rec) => (
    
    <Grid item xs={12} sm={6} md={3} key={rec.id} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        key={rec.id}
        onClick={() => {openRecipe(rec.recipe_id)}}
        variant="outlined"
        data-testid="recipe"
        sx={{ maxWidth: 450, width: "100%" }}
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
            {/* TODO: same as RecipesView */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ));

  return (
    <Box sx={{ marginBottom: 2}}>
      <Typography variant="h3" gutterBottom>{title}</Typography>
      <div id="image list">
        <Grid container spacing={2}> 
          {cards}
        </Grid>
      </div>
    </Box>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(RecipeShape).isRequired,
  openRecipe: PropTypes.func.isRequired    
}