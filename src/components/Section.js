import PropTypes from 'prop-types';

import { Box, Typography, useTheme, useMediaQuery  } from '@mui/material';

import RecipeShape from './RecipeShape';
import RecipeCard from './RecipeCard';

export default function Section(props) {
  const { title, recipes, openRecipe } =  props; 
      
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