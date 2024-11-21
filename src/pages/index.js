import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter} from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchBar from "@/components/SearchBar";
import UserShape from "@/components/UserShape";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import theme from "../material/theme";

export default function Home({ setCurrentRecipe, currentUser, viewAccount}) {
  const router = useRouter();

  const [fetchedRecipes,setFetchedRecipes] = useState([])

  useEffect(() => {
   (async () => {
      try {
      const res = await fetch(`/api/recipes/type`)
        if (!res.ok) {
          throw new Error("GET user/id response fail");
        }
        const data = await res.json();
        setFetchedRecipes(data)
        
    } catch (error) {
      console.log("Error Retreiving recipes")
    };
    })()
  },[]);

  let sections = <div>LOADING...</div>
  
  // tempSections does not represent the actual composition of a section object
  if (fetchedRecipes){
    let demoSections = [{ title: "All Recipes:", recipes: fetchedRecipes}];
    if (fetchedRecipes.length > 4) {
      const newRecipes = fetchedRecipes.slice(0,4)
      const oldRecipes = fetchedRecipes.slice(fetchedRecipes.length-4,fetchedRecipes.length);
      demoSections = [{ title: "Newest Recipes:", recipes:newRecipes}, {title: "Oldest Recipes:", recipes:oldRecipes}];
    }
    sections = demoSections.map(({ title, recipes }) => (<Section key = {title} title={title} recipes={recipes} openRecipe={setCurrentRecipe} />));
  }
  
  
   // Using current Recipe as a place holder

  return (
    <div>
      <Head>
        <title>Dorm Recipes</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <main>
              <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={()=>{viewAccount(0)}}/>
              <Container>
                <SearchBar/>
                <Button variant="contained" onClick={() => router.push("/add-recipe")}>Add Recipe</Button>
              </Container>
              <Container>
                <Typography variant="h2">Featured Recipe:</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid onClick={() => {setCurrentRecipe(0)}} container spacing={2}>
                    <Grid>
                      <Image src="/pbj.jpg" height="325" width="325" />
                    </Grid>
                    <Grid size = {4}>
                      <Typography variant="h5">PB and J</Typography>
                      <Typography variant="body1">The timeless classic!</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
              <Container>
                {sections}
              </Container>
            </main>
        </ThemeProvider>
    </div>
  );
}

Home.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
