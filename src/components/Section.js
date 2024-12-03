import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';
import PropTypes from 'prop-types';
import RecipeShape from './RecipeShape';

export default function Section(props) {
  const {title, recipes, openRecipe} =  props; // TODO: ASK WHY THIS WORKED AND THE OLD ONE DIDNT

  const cards = [...recipes].map((rec) => (
    <Card
      key={rec.id}
      onClick={() => {openRecipe(rec.recipe_id)}}
      variant="outlined"
    >
      <CardActionArea>
        <CardContent>
          <Image src="/food.jpg" width={200} height={200}/>

          <Typography textAlign="center" variant="h6">{rec.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <div>
      <Typography variant="h2">{title}</Typography>
      <div id="image list">
        <Stack direction="row" spacing={2}> 
          {cards}
        </Stack>
      </div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(RecipeShape).isRequired,
  openRecipe: PropTypes.func.isRequired    
}