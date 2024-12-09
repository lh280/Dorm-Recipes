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
    
    <Box key={rec.id}  sx={{ flex: '0 0 auto', margin: 1 }}>
      <Card
        key={rec.id}
        onClick={() => {openRecipe(rec.recipe_id)}}
        variant="outlined"
        data-testid="recipe"
        sx={{ maxWidth: 450, width: "100%" }}
      >
        <CardActionArea>
          <CardContent>
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                overflow: "hidden", 
                }}>
              <Image 
                src={(rec.img ? rec.img : "/food.jpg")} 
                width={200} 
                height={200} 
                alt="Picture of the recipe"
                objectPosition="center"
                />
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
    </Box>
  ));

  return (
    <Box sx={{ marginBottom: 2}}>
      <Typography variant="h3" gutterBottom>{title}</Typography>
      <div id="image list">
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // horizontal scrolling
          scrollBehavior: 'smooth', 
          padding: 1, 
        }}
      >
          {cards}
        </Box>
      </div>
    </Box>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(RecipeShape).isRequired,
  openRecipe: PropTypes.func.isRequired    
}