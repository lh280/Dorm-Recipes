import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent, useTheme, useMediaQuery, TextField, Stack, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";

import UserInfoShape from "@/components/UserInfoShape";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import theme from "../../material/theme";
import getStarIcons from '../../lib/getStarIcons';

export default function UserView({ setCurrentRecipe, viewAccount, initialUserInfo }) {
    const router = useRouter();
    const { id } = router.query;

    // eslint-disable-next-line no-unused-vars
    const { data: session, status } = useSession();
    const goHome = session;

    useEffect(() => {
        if (status !== "authenticated") {
            router.push("/");
        }
    }, [goHome, status]); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO: fix routing on user page (url shows "/users/0", but api is fetching "/recipes/0")
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [tab, setTab] = useState("My Recipes");
    const [currentContent, setCurrentContent] = useState(<div>Loading...</div>);

    const [pantryState, setPantryState] = useState("view");
    const [name, setName] = useState('');
    const [selectedIng, setSelectedIng] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [newQuantity, setNewQuantity] = useState(1);
    const [unit, setUnit] = useState('');
    const [newUnit, setNewUnit] = useState("");

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

    const setQuant = (val) => {
        if (val) {
            setNewQuantity(val);
        }else{
            setNewQuantity("");
        }
    }

    useEffect(() => {
        const addItem = async () => {
            // Create ingredient with name
            let ingredient_id; // TEMP
            let ingName;
            try {
                const response = await fetch(
                    "/api/ingredient",
                    {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({name})
                    });
                if (!response.ok) {
                    throw new Error('Failed to submit Item');
                } else {
                    const result = await response.json()
                    ingredient_id = result.ingredient_id;
                    ingName = result.ingredient_name;
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("Error creating Pantry item")
            }
            
            const user_id = session?.user.id;
            const body = JSON.stringify({user_id, ingredient_id, name, quantity, unit});
            try {
                const response = await fetch(
                    "/api/pantry",
                    {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body
                    });
                if (!response.ok) {
                    throw new Error('Failed to submit Item');
                }

                const item = await response.json();
                item.ingredient_name = ingName
                userInfo.pantry_items.push(item);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("Error creating pantry item: ", error);
            }
            setName("");
            setPantryState("");
        }

        const editItem = async () => {
            try {
                const user_id = session?.user.id;
                const body = {user_id, selectedIng, newQuantity, newUnit}
                const response = await fetch(
                    "/api/pantry",
                    {
                        method: "Put",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(body)
                    }
                )
                if (!response) {
                    throw new Error('Failed to update Item');
                }
                const index = userInfo.pantry_items.findIndex(item => item.ingredient_id === selectedIng);
                const item = userInfo.pantry_items[index]
                item.quantity = newQuantity
                item.unit = newUnit
                userInfo.pantry_items[index] = item;
                setSelectedIng("");
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error updating Pantry item")
            }
        }

        const deleteItem = async () => {
            try {
                const user_id = session?.user.id;
                const response = await fetch(
                    "/api/pantry",
                    {
                        method: "Delete",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({user_id, selectedIng})
                    });
                if (!response.ok) {
                    throw new Error('Failed to delete Item');
                } else {
                    userInfo.pantry_items = userInfo.pantry_items.filter(item => item.ingredient_id !== selectedIng)
                }

            }catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error Deleting Pantry item")
            }
            setSelectedIng("");
        }

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

       let addPantryCard;
        if (pantryState === "add") {
            addPantryCard = (<Grid key="addIng" size={isMobile ? 6 : 4} sx={{minHeight:99}}>
                <Card variant="outlined" >
                    <CardContent>
                        <Stack spacing={2}>
                            <TextField id="Name" name = "test" label="Name" variant="standard" value={name}
                            onChange={(event) => {setName(event.target.value);}}/>
                            <Stack direction="row" spacing={1}>
                                <TextField id="quantity" label="Quantity" variant="standard"
                                onChange={(e) => {setQuantity(e.target.value)}}/>
                                <TextField id="Unit" label="Unit" variant="standard" onChange={(e) => {setUnit(e.target.value)}}/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Button color="error" variant="contained" onClick={() => {setPantryState("")}}>Close</Button>
                                <Button color="success" variant="contained" onClick={addItem}>Save</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>)
        } else {
            addPantryCard = (<Grid key="addIng" size={isMobile ? 6 : 4}>
                <Card variant="outlined" sx={{minHeight:99}}>
                    <CardActionArea sx={{ textAlign:"center", minHeight:98}} onClick={() => setPantryState("add")}>
                        <CardContent>
                            <Typography variant={isMobile ? "h4" : "h3"}><strong>+</strong></Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            )
        }    
        
        if (userInfo) {
            let content;
            switch (tab) {
                case "My Reviews":
                    if(!userInfo.user_reviews || userInfo.user_reviews.length === 0){
                        content = <p>No reviews yet—go check out some recipes!</p>;
                    }
                    else{
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
                    }
                    break;
                case "My Pantry":
                    if(!userInfo.pantry_items){
                        content = addPantryCard;
                    }
                    else{
                        content = [addPantryCard, ...userInfo.pantry_items.map((item) => {
                            if (item.ingredient_id === selectedIng) {
                                return (
                                <Grid key={`ing${item.ingredient_id}`} size={isMobile ? 6 : 4}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Stack direction="row" spacing={2} mb={2}>
                                                <Typography variant={isMobile ? "h6" : "h5"}><strong>{item.ingredient_name}</strong></Typography>
                                                <Button color="error" variant="contained" onClick={deleteItem}>Delete</Button>
                                            </Stack>
                                            <Stack spacing={1}>
                                                <Stack direction="row" spacing={1}>
                                                    <TextField id="quantity" label="Quantity" variant="standard"
                                                        value ={newQuantity} onChange={(e) => {setQuant(Number(e.target.value))}}/>
                                                    <TextField id="Unit" label="Unit" variant="standard"
                                                        value ={newUnit} onChange={(e) => setNewUnit(e.target.value)}/>
                                                </Stack>
                                                <Stack direction="row" spacing={2}>
                                                    <Button color="error" variant="contained" onClick={() => {setSelectedIng("")}}>Cancel</Button>
                                                    <Button color="success" variant="contained" onClick={editItem}>Save</Button>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>)
                            }
                            return (
                            <Grid key={`ing${item.ingredient_id}`} size={isMobile ? 6 : 4}>
                                <Card variant="outlined">
                                    <CardActionArea onClick={() => {
                                        setSelectedIng(item.ingredient_id);
                                        setNewQuantity(Math.trunc(item.quantity));
                                        setNewUnit(item.unit)}}>
                                        <CardContent>
                                            <Typography variant={isMobile ? "h6" : "h5"}><strong>{item.ingredient_name}</strong></Typography>
                                            <Typography variant={isMobile ? "body1" : "h6"}>Quantity: {Math.trunc(item.quantity)} {item.unit}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>)
                            }
                        )];
                    }
                    break;
                default:
                    if(!userInfo.user_recipes){
                        content = addRecipeCard;
                    }
                    else{
                        content = [addRecipeCard, ...userInfo.user_recipes.map((recipe) => (
                            <Grid key={`rec${recipe.recipe_id}`} item xs={6} sm={4} md={3} sx={{ display: "flex", justifyContent: "center" }}>
                                <RecipeCard recipe={recipe} setCurrentRecipe={setCurrentRecipe} size={isMobile ? 120 : 250} />
                            </Grid>
                        ))];
                    }
                    break;
            }
            setCurrentContent(content);
        }
    }, [initialUserInfo, userInfo, tab, setCurrentRecipe, router, isMobile, pantryState, name, quantity, unit, selectedIng, newQuantity, newUnit, session?.user.id]);

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
                    <Header setCurrentRecipe={setCurrentRecipe} goToAccount={viewAccount} />
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
    viewAccount: PropTypes.func,
    initialUserInfo: UserInfoShape
};
