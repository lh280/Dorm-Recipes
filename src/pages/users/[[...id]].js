import PropTypes from "prop-types";
import UserShape from "@/components/UserShape";
import Header from "@/components/Header"
import {ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent} from "@mui/material"
import Image from 'next/image';
import { useState } from "react";
import Grid from "@mui/material/Grid2"
import UserInfoShape from "@/components/UserInfoShape";

export default function UserView({setCurrentRecipe, currentUser, viewAccount, userInfo}){
    const [tab, setTab] = useState("My Recipes");
    const changeTab = (newTab) => {
        if (tab !== newTab){
            setTab(newTab);
        }
    }
    let recipes;
    let reviews;
    const ingredients =  [
        <Grid key = "ing0" size={4}>
            <Card variant="outlined" >     
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">Flour</Typography>
                        <Typography variant="h6"> Quantity: Half a pound</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>,
        <Grid key = "ing1" size={4}>
            <Card variant="outlined" >     
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">Sugar</Typography>
                        <Typography variant="h6"> Quantity: One pound</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    ];
    
    if (userInfo){
        recipes = userInfo.user_recipes.map((recipe) => 
            (<Grid key={`rec${recipe.recipe_id}`}>
                    <Card variant="outlined" >
                    <CardActionArea>
                        <CardContent>
                            <Image src="/food.jpg" alt="Recipe Title" width={250} height={250} alignContent="center"/>
                            <Typography textAlign="center" variant="h5">{recipe.title}</Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
            </Grid>)
        )
 
        reviews = userInfo.user_reviews.map((review) => 
            (<Grid key={`rev${review.review_id}`} size={6}>
                <Card variant="outlined" >     
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5">{`Recipe ID: ${review.recipe_id}`}</Typography>
                            <Typography variant="h6">{`Number of Stars: ${review.rating / 2}`}</Typography>
                            <Typography variant="h6">Review:</Typography>
                            <Typography>{review.content}</Typography>
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
            break;
        default:
            currentContent = recipes;
            break;
    }

    return(
    <>
        <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} goToAccount={viewAccount}/>
        <Box display="flex" alignContent="center" justifyContent="center">
            <ToggleButtonGroup
            size="large"
            aria-label="Large Sizes"
            value={tab}
            exclusive
            >
                <ToggleButton value="My Recipes" onClick={()=>changeTab("My Recipes")}>My Recipes</ToggleButton>
                <ToggleButton value="My Reviews" onClick={()=>changeTab("My Reviews")}>My Reviews</ToggleButton>
                <ToggleButton value="My Pantry" onClick={()=>changeTab("My Pantry")}>My Pantry</ToggleButton>
            </ToggleButtonGroup>
        </Box>
        <Typography variant = "h4">{tab}</Typography>
        <Grid container rowSpacing={2} columnSpacing={2}>
            {currentContent !== undefined? currentContent:<div>loading</div>}
        </Grid>
    </> )
}

UserView.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func,
  userInfo: UserInfoShape
};
