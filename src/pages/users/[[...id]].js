import PropTypes from "prop-types";
import UserShape from "@/components/UserShape";
import Header from "@/components/Header"
import {ToggleButton, ToggleButtonGroup, Box, Typography, Card, CardActionArea, CardContent} from "@mui/material"
import Image from 'next/image';
import { useState } from "react";
import Grid from "@mui/material/Grid2"

export default function UserView({setCurrentRecipe, currentUser, viewAccount}){
    const [tab, setTab] = useState("My Recipes");
    const changeTab = (newTab) => {
        if (tab !== newTab){
            setTab(newTab);
        }
    }
    const recipes = [
        (<Grid key="0">
                    <Card variant="outlined" >
                    <CardActionArea>
                        <CardContent>
                            <Image src="" width={250} height={250} alignContent="center"/>
                            <Typography textAlign="center" variant="h5">Recipe Title</Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
        </Grid>)]

    const reviews = [
        <Grid key = "0" size={6}>
            <Card variant="outlined" >     
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">Stove top Mac and Cheese</Typography>
                        <Typography variant="h6"> Number of Stars: 1</Typography>
                        <Typography variant="h6">Review:</Typography>
                        <Typography>I didnt have milk so I used french vanilla coffee creamer instead. Other than that, I followed the recipe exactly. The Mac and cheese was incredibly sweet and almost inedible. Will not try again!</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>]

    const ingredients = [
        <Grid key = "0" size={4}>
            <Card variant="outlined" >     
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">Flour</Typography>
                        <Typography variant="h6"> Quantity: Half a pound</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>,
        <Grid key = "0" size={4}>
            <Card variant="outlined" >     
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">Sugar</Typography>
                        <Typography variant="h6"> Quantity: One pound</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    ]
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
            {currentContent}
        </Grid>
        
    </> )
}

UserView.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
