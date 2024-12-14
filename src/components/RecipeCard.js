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

    const imgLinks = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDR5k6f14Em_mZ20WnXBTkryMTyBNUgmKGHEvWfEnzYCy8C-h0",
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRRffb4EBMFI__Cgw0YvIb1oB9tyVO5uJstECGV2ShVKydx9Kb9",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCGdEfcCk4xBvTacxKVJHJRqSkwsADTwkHq4ZqOapMj_04493f",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkagiJeupK0d9jhY-a4TJ9ckbGuQn82ZrQVhDvJXuqTN_T4bCD",
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRQh6dIfgq31_P4KDXZfWbptrcntsSUyc7PO1vj0xV6UAl-vFYz",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Dcf5qwbC2uBdw3DUgPcLwfhBIZWrwxZYcDPtwKpEB-xWLlpn",
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTstHVxU0vWrplZ-QT1IgORpzQvapdNtROhkHox4gQzjalFk1ga",
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQubA6CQT1eYhlR556vsLodlBo2vmwvTGkzZxNAo3sGCG57xels",
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLiN0v53zGtD0QB9UbctOINB6zHJtmAi85-2liN_XzAQSMYu-s",
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXeoC2VrGfaW7x6Jw4I09q93zaxkjmV4K05-Fwt_RoFqfbdRzD"
    ];

    const img = (recipe && recipe.recipe_id <= 9) ? imgLinks[recipe.recipe_id] : "/food1.jpg";

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

    if (!recipe) {
        return <p>Loading...</p>
    }

    const cardSize = (size || 200);

    return (
        <Card
            key={recipe.id}
            onClick={() => { setCurrentRecipe(recipe.recipe_id) }}
            variant="outlined"
            data-testid="recipe"
            sx={{
                cursor: "pointer",
                width: (size ? (size + 30) : 235),
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
                        maxWidth: { size },
                        overflow: "hidden"
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Image
                            src={img}
                            width={cardSize}
                            height={cardSize}
                            alt="Picture of the recipe"
                            style={{ objectFit: "cover" }} />
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
                    <Box sx={{ textAlign: "center", marginTop: { xs: 0.5, sm: 2 } }}>
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