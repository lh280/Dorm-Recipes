import { Box, Typography, Card, CardActionArea, CardContent } from "@mui/material"
import Image from "next/image"

export default function makeRecipeCard({ recipe, setCurrentRecipe, size }) {
    if(!recipe){
        return <p>Loading...</p>
    }
    let cardSize;
    if(!size){
        cardSize = 200;
    }
    else{
        cardSize = size;
    }
    return (
        <Card
        key={recipe.id}
        onClick={() => {setCurrentRecipe(recipe.recipe_id)}}
        variant="outlined"
        data-testid="recipe"
        sx={{ 
            cursor: "pointer",
            maxWidth: 450, 
            width: "100%",
            "&:hover": {
                backgroundColor: "action.hover", 
                boxShadow: 3, 
            } }}
        >
            <CardActionArea>
                <CardContent>
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                  }}>
                    <Image 
                       src={(recipe.img ? recipe.img : "/food.jpg")} 
                       width={cardSize} 
                       height={cardSize} 
                       alt="Picture of the recipe"/>
                </Box>
                <Typography textAlign="center" 
                    variant="h6" 
                    sx={{ 
                    maxWidth: cardSize, 
                    whiteSpace: "normal", // allows wrapping
                    overflowWrap: "break-word", // break long words to fit in card
                    wordBreak: "break-word", 
                    margin: "0 auto" // center-align in container
                    }}>
                    {recipe.title}
                    </Typography>
                {/* TODO: add: rating, prep_time?, servings? author?, part of description?, updated_at? */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}