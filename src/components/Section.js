import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Image from 'next/image';

export default function Section(title, openRecipe) {
  const tempRecipeIds = ["id1", "id2"];

  const recipes = tempRecipeIds.map((id) => (
    <Card
      key={id}
      onClick={() => {openRecipe()}}
      variant="outlined"
    >
      <CardActionArea>
        <CardContent>
          <Image src="" width={250} height={250}/>

          <Typography textAlign="center" variant="h5">recipe title</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <div>
      <Typography variant="h3">{title}</Typography>
      <div id="image list">
        <Stack direction="row" spacing={2}> 
          {recipes}
        </Stack>
      </div>
    </div>
  );
}
