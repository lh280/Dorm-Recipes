import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

import UserInfoShape from "@/components/UserInfoShape";
import UserShape from "@/components/UserShape";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import theme from "../../material/theme";
import getStarIcons from '../../lib/getStarIcons';

export default function UserView({ setCurrentRecipe, currentUser, viewAccount, initialUserInfo }) {
    const router = useRouter();
    const { id } = router.query;

    // eslint-disable-next-line no-unused-vars
    const { data: session, status } = useSession();
    const goHome = session;

    useEffect(() => {
        if (status !== "authenticated") {
            router.push("/");
        }
    }, [goHome, status]);

    // TODO: fix routing on user page (url shows "/users/0", but api is fetching "/recipes/0")
    const [tab, setTab] = useState("My Recipes");
    const [currentContent, setCurrentContent] = useState(<div>Loading...</div>);
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const mTheme = useTheme();
    const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));

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
        if (tab !== newTab) {
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
                        cursor: "pointer",
                        width: isMobile ? 150 : 284,
                        padding: isMobile ? 1 : 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "&:hover": {
                            backgroundColor: "action.hover",
                            boxShadow: 3,
                        }
                    }}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" sx={{ textAlign: "center", color: "primary.main" }}>+</Typography>
                            <Typography variant="body2" fontSize={isMobile ? ".8rem" : "1rem"} sx={{ textAlign: "center" }}>Add a new recipe</Typography>
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
                        <Grid key={`rev${review.review_id}`} onClick={() => setCurrentRecipe(review.recipe_id)} size={6} sx={{ mb: 3 }}>
                            <Card variant="outlined" sx={{ "&:hover": { backgroundColor: "action.hover", boxShadow: 3, } }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5"><strong>Recipe:</strong> {review.recipes.title}</Typography>
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
                    content = userInfo.pantry_items.map((item) =>
                        <Grid key={`ing${item.ingredient_id}`} size={isMobile ? 6 : 4}>
                            <Card variant="outlined">
                                <CardActionArea sx={{ cursor: "default" }}>
                                    <CardContent>
                                        <Typography variant={isMobile ? "h6" : "h5"}><strong>{item.ingredient_name}</strong></Typography>
                                        <Typography variant={isMobile ? "body1" : "h6"}>Quantity: {Math.trunc(item.quantity)} {item.unit}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>,
                    );
                    break;
                default:
                    content = [addRecipeCard, ...userInfo.user_recipes.map((recipe) => (
                        <Grid key={`rec${recipe.recipe_id}`} item xs={6} sm={4} md={3} sx={{ display: "flex", justifyContent: "center" }}>
                            <RecipeCard recipe={recipe} setCurrentRecipe={setCurrentRecipe} size={isMobile ? 120 : 250} />
                        </Grid>
                    ))];
                    break;
            }
            setCurrentContent(content);
        }
    }, [initialUserInfo, userInfo, tab, setCurrentRecipe, router, isMobile]);

    return (
        <div>
            <Head>
                <title>Dorm Recipes | Account</title>
                <meta name="Dorm Recipes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main style={{ paddingTop: '115px' }}>
                    <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} goToAccount={viewAccount} />
                    <Box display="flex" alignContent="center" justifyContent="center">
                        <ToggleButtonGroup size={isMobile ? "medium" : "large"} aria-label="Tab Group" value={tab} exclusive>
                            <ToggleButton value="My Recipes" onClick={() => changeTab("My Recipes")}>My Recipes</ToggleButton>
                            <ToggleButton value="My Reviews" onClick={() => changeTab("My Reviews")}>My Reviews</ToggleButton>
                            <ToggleButton value="My Pantry" onClick={() => changeTab("My Pantry")}>My Pantry</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ textAlign: "left", mb: 4, paddingX: 2, mt: 3 }}>
                        {tab}
                    </Typography>
                    <Box sx={{ paddingX: 2 }}>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            {currentContent}
                        </Grid>
                    </Box>
                    <Box sx={{ height: 50 }} />
                </main>
            </ThemeProvider>
        </div>
    );
}


UserView.propTypes = {
    setCurrentRecipe: PropTypes.func.isRequired,
    currentUser: UserShape,
    viewAccount: PropTypes.func,
    initialUserInfo: UserInfoShape
};
