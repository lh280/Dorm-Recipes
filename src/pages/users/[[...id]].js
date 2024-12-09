import PropTypes from "prop-types";
import UserShape from "@/components/UserShape";
import Header from "@/components/Header"
import {ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent} from "@mui/material"
import Image from 'next/image';
import { useState } from "react";
import Grid from "@mui/material/Grid2"
import UserInfoShape from "@/components/UserInfoShape";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../material/theme";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; //eslint-disable-line


function getStarIcons(rating) {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const totalStars = 5; 
    return (<>
        {Array.from({ length: totalStars }, (s, index) => {
          if (index < fullStars) {
            return <FaStar key={s} style={{ color: "gold" }} />;
          }
          if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={s} style={{ color: "gold" }} />;
          }
          return <FaRegStar key={s} style={{ color: "gold" }} />;
        })}
    </>);
}

export default function UserView({setCurrentRecipe, currentUser, viewAccount, userInfo}){
    // TODO: fix routing on user page (url shows "/users/0", but api is fetching "/recipes/0")
    const [tab, setTab] = useState("My Recipes");
    const changeTab = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab);
        }
    }
    // console.log(userInfo);
    let recipes;
    let reviews;
    let ingredients = [];

    if (userInfo){
        recipes = userInfo.user_recipes.map((recipe) => 
            (<Grid key={`rec${recipe.recipe_id}`} onClick={() => setCurrentRecipe(recipe.recipe_id)} item xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" data-testid="recipe" sx={{ maxWidth: 450, width: "100%" }}>
                    <CardActionArea>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                                <Image src={(recipe.img ? recipe.img : "/food.jpg")} width={250} height={250} alt="Picture of the recipe"/>
                            </Box>
                            <Typography textAlign="center" 
                                variant="h5" 
                                sx={{ 
                                    maxWidth: 250, 
                                    whiteSpace: "normal", // allows wrapping
                                    overflowWrap: "break-word", // break long words to fit in card
                                    wordBreak: "break-word", 
                                    margin: "0 auto" // center-align in container
                                }}>
                                    {recipe.title}
                                </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>)
        )
 
        reviews = userInfo.user_reviews.map((review) => 
            (<Grid key={`rev${review.review_id}`} size={6} sx={{ mb: 3 }}>
                <Card variant="outlined">     
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5"><strong>Recipe:</strong>{review.recipe_title}</Typography> 
                            {/* TODO: find some way to show/fetch recipe title */}
                            <Typography variant="h7">ID: {review.recipe_id}</Typography>
                            <Typography variant="h6"><strong>Rating:</strong> {getStarIcons(review.rating)}</Typography>
                            <Typography variant="h6"><strong>Review:</strong></Typography>
                            <Typography>{review.content}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>)
        )

        ingredients = userInfo.pantry_items.map((pantryItem) => (
            <Grid key={`rev${pantryItem.ingredient_id}`} size={6} sx={{ mb: 3 }}>
                <Card variant="outlined" > 
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5">{pantryItem.ingredient_name}</Typography>
                            <Typography variant="h6"> Quantity: {Math.trunc(pantryItem.quantity)} {pantryItem.unit}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>)
        )
    }
   
    let currentContent;
    switch (tab) {
        case "My Reviews":
            currentContent = reviews
            break;
        case "My Pantry":
            currentContent = ingredients
            ingredients.unshift(
            (<Grid size={6} onClick = {() => {}}>
                <Card variant="outlined">     
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h3" sx={{textAlign: "center"}} >+</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>))
            break;
        default:
            currentContent = recipes;
            break;
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main style={{ paddingTop: '115px' }}>
                <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} goToAccount={viewAccount} />
                <Box display="flex" alignContent="center" justifyContent="center">
                    <ToggleButtonGroup size="large" aria-label="Tab Group" value={tab} exclusive>
                        <ToggleButton value="My Recipes" onClick={() => changeTab("My Recipes")}>My Recipes</ToggleButton>
                        <ToggleButton value="My Reviews" onClick={() => changeTab("My Reviews")}>My Reviews</ToggleButton>
                        <ToggleButton value="My Pantry" onClick={() => changeTab("My Pantry")}>My Pantry</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Typography variant="h4" sx={{ textAlign: "left", mb: 4, paddingX: 2  }}>
                    {tab}
                </Typography>
                <Box sx={{ paddingX: 2 }}>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {currentContent !== undefined ? currentContent : <div>Loading...</div>}
                    </Grid>
                </Box>
            </main>
        </ThemeProvider>
        );
    }

UserView.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func,
  userInfo: UserInfoShape
};
