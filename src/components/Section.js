import PropTypes from 'prop-types';

import { Box, Typography, useTheme, useMediaQuery  } from '@mui/material';

import RecipeShape from './RecipeShape';
import RecipeCard from './RecipeCard';

/* 
  TODO: 
  fix 
    Failed prop type: The prop `recipes[0].recipe_id` is marked as required in `Section`, but its value is `undefined`.
*/

export default function Section(props) {
  const {title, recipes, openRecipe} =  props; // TODO: ASK WHY THIS WORKED AND THE OLD ONE DIDN'T
      
    const mTheme = useTheme();
    const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));

  const cards = [...recipes].map((rec) => (
    
    <Box key={rec.id}  sx={{ flex: '0 0 auto', margin: 1 }}>
      <RecipeCard recipe={rec} setCurrentRecipe={openRecipe}/>
    </Box>
  ));

  return (
    <Box sx={{ marginBottom: 2}}>
      <Typography variant={isMobile ? "h4" : "h3"} gutterBottom>{title}</Typography>
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