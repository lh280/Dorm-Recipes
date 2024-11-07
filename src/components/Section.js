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
      onClick={() => {openRecipe()}}
      variant="outlined"
    >
      <CardActionArea>
        <CardContent>
          <Image src="" width={250} height={250}/>

          <Typography textAlign="center" variant="h5">{rec.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <div>
      <Typography variant="h3">{title}</Typography>
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