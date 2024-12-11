import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Box, Typography, Card, CardActionArea, CardContent, useTheme, useMediaQuery } from "@mui/material"
import Image from "next/image"

import RecipeShape from "@/components/RecipeShape";

import getStarIcons from '../lib/getStarIcons';

export default function RecipeCard({ recipe, setCurrentRecipe, size }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [ratingData, setRatingData] = useState({ averageRating: 0, reviewCount: 0 });
    
    useEffect(() => {
        if (recipe && recipe.recipe_id) {
            fetch(`/api/recipes/${recipe.recipe_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.recipe_reviews && data.recipe_reviews.length > 0) {
                        const totalReviews = data.recipe_reviews.length;
                        const totalScore = data.recipe_reviews.reduce((sum, review) => sum + review.rating, 0);
                        const averageRating = totalScore / totalReviews;
    
                        setRatingData({
                            averageRating: averageRating.toFixed(1),
                            reviewCount: totalReviews
                        });
                    } else {
                        setRatingData({
                            averageRating: 0,
                            reviewCount: 0
                        });
                    }
                })
                // eslint-disable-next-line no-console
                .catch(err => console.error("Error fetching review data:", err));
        }
    }, [recipe]);

    if(!recipe){
        return <p>Loading...</p>
    }

    const cardSize = (size || 200);

    return (
        <Card
          key={recipe.id}
          onClick={() => {setCurrentRecipe(recipe.recipe_id)}}
          variant="outlined"
          data-testid="recipe"
          sx={{ 
            cursor: "pointer",
            width: (size ? (size+30) : 235), 
            "&:hover": {
                backgroundColor: "action.hover", 
                boxShadow: 3, 
            } 
          }}
        >
            <CardActionArea>
                <CardContent       
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        maxWidth: {size}, 
                        overflow: "hidden"
                    }}>
                    <Box 
                      sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                    }}>
                        <Image 
                        src={(recipe.img ? recipe.img : "/food1.jpg")} 
                        width={cardSize} 
                        height={cardSize} 
                        alt="Picture of the recipe"
                        style={{objectFit: "cover"}}/>
                    </Box>
                    <Typography 
                        textAlign="center" 
                        variant="h6"
                        sx={{ 
                        maxWidth: cardSize, 
                        whiteSpace: "normal", // allows wrapping
                        overflowWrap: "break-word", // break long words to fit in card
                        wordBreak: "break-word", 
                        margin: "0 auto", // center-align in container
                        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.25rem" }
                        }}>
                        {recipe.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        textAlign="center"                 
                        sx={{
                            display: "-webkit-box", 
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2, 
                            overflow: "hidden", 
                            whiteSpace: "normal",
                            textOverflow: "ellipsis", 
                            maxWidth: "100%",
                            fontSize: { xs: "0.75rem", sm: ".8rem", md: "1rem" }
                        }}>
                      {recipe.description}
                    </Typography>
                    <Box sx={{ textAlign: "center", marginTop: {xs: 0.5, sm: 2 }}}>
                        {ratingData.averageRating > 0 ? (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {getStarIcons(ratingData.averageRating)}
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    ({ratingData.reviewCount})
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" fontSize={isMobile ? ".7rem" : "1rem"}>No reviews yet</Typography>
                        )}
                    </Box>
                {/* TODO?: add: prep_time, servings, updated_at? */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

RecipeCard.propTypes = {
    recipe: RecipeShape, 
    setCurrentRecipe: PropTypes.func.isRequired, 
    size: PropTypes.number
  };