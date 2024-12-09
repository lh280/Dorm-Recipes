import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2"

import UserInfoShape from "@/components/UserInfoShape";
import UserShape from "@/components/UserShape";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../material/theme";

import getStarIcons from '../../lib/getStarIcons';

export default function UserView({ setCurrentRecipe, currentUser, viewAccount, initialUserInfo }){
    const router = useRouter();
    const { id } = router.query; 
    // TODO: fix routing on user page (url shows "/users/0", but api is fetching "/recipes/0")
    const [tab, setTab] = useState("My Recipes");
    const [currentContent, setCurrentContent] = useState(<div>Loading...</div>);
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        if (!userInfo && id) {
          fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((data) => setUserInfo(data))
            // eslint-disable-next-line no-console
            .catch((err) => console.error(err));
        }
      }, [id, userInfo]);

    const changeTab = (newTab) => {
        if (tab !== newTab){
            setTab(newTab);
        }
    }
    
    useEffect(() => {
        const addRecipeCard = (
            <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                onClick={() => router.push("/add-recipe")}
                variant="outlined"
                sx={{
                  maxWidth: 450,
                  width: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "action.hover", 
                    boxShadow: 3, 
                  },
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" sx={{ textAlign: "center", color: "primary.main" }}>+</Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>Add a new recipe</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );

        if (userInfo) {
            let content;
            switch (tab) {
                case "My Reviews":
                    content = userInfo.user_reviews.map((review) => (
                        <Grid key={`rev${review.review_id}`} size={6} sx={{ mb: 3 }}>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5"><strong>Recipe:</strong>{review.recipe_title}</Typography>
                                        <Typography variant="h7">ID: {review.recipe_id}</Typography>
                                        <Typography variant="h6"><strong>Rating:</strong> {getStarIcons(review.rating)}</Typography>
                                        <Typography variant="h6"><strong>Review:</strong></Typography>
                                        <Typography>{review.content}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ));
                    break;
                case "My Pantry":
                    content = [
                        // TODO: fetch ingredients from pantry db, not stored here in code
                        <Grid key="ing0" size={4}>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5">Flour</Typography>
                                        <Typography variant="h6"> Quantity: Half a pound</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>,
                        <Grid key="ing1" size={4}>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5">Sugar</Typography>
                                        <Typography variant="h6"> Quantity: One pound</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>,
                    ];
                    break;
                default:
                    content = [addRecipeCard, ...userInfo.user_recipes.map((recipe) => (
                        <Grid key={`rec${recipe.recipe_id}`} item xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
                            <RecipeCard recipe={recipe} setCurrentRecipe={setCurrentRecipe} size={250}/>
                        </Grid>
                    ))];
                    break;
            }
            setCurrentContent(content);
        }
    }, [initialUserInfo, userInfo, tab, setCurrentRecipe, router]);

    return (
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
                <Typography variant="h4" sx={{ textAlign: "left", mb: 4, paddingX: 2 }}>
                    {tab}
                </Typography>
                <Box sx={{ paddingX: 2 }}>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        {currentContent}
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
  initialUserInfo: UserInfoShape
};
