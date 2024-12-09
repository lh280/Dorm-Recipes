import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { Typography, Box, Button, Container, Card, CardActionArea, CardContent} from "@mui/material";
import UserShape from "@/components/UserShape";
import { useState, useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";

import Section from "@/components/Section";
import Header from "@/components/Header";

export default function Home({ setCurrentRecipe, currentUser, viewAccount}) {
  const router = useRouter();

  const [fetchedRecipes,setFetchedRecipes] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/recipes/type`)
        if (!res.ok) {
          // eslint-disable-next-line no-console
          throw new Error("GET user/id response fail");
        }
        const data = await res.json();
        setFetchedRecipes(data)
        
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error retrieving recipes")
      };
    })()
  },[]);

  let sections = <div>LOADING...</div>
  
  // tempSections does not represent the actual composition of a section object
  if (fetchedRecipes){
    let demoSections = [{ title: "All Recipes", recipes: fetchedRecipes}];
    if (fetchedRecipes.length > 4) {
      const newRecipes = fetchedRecipes.slice(0,4)
      const oldRecipes = fetchedRecipes.slice(fetchedRecipes.length-4,fetchedRecipes.length);
      demoSections = [{ title: "Newest Recipes", recipes:newRecipes}, {title: "Oldest Recipes", recipes:oldRecipes}];
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
        <main style={{ paddingTop: '80px' }}>
          <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={() => { viewAccount(0) }} />
          <Container sx={{ paddingY: 0 }}>
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button
                variant="contained"
                onClick={() => router.push("/add-recipe")}
                sx={{ padding: '10px 20px' }}
              >
                Add Recipe
              </Button>
            </Box>
          </Container>
          <Container sx={{ paddingY: 0 }}>
            <Typography variant="h3" gutterBottom>
              Featured Recipe
            </Typography>
            <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
              <Card
                onClick={() => { setCurrentRecipe(0); }}
                variant="outlined"
                sx={{ maxWidth: 300, width: "100%", margin: "0 auto" }}
              >
                <CardActionArea>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                      <Image src="/pbj.jpg" height={200} width={200} alt="Picture of the recipe" />
                    </Box>
                    <Typography textAlign="center"
                      variant="h6"
                      sx={{
                        maxWidth: 200,
                        whiteSpace: "normal", // allows wrapping
                        overflowWrap: "break-word", // break long words to fit in card
                        wordBreak: "break-word",
                        margin: "0 auto" // center-align in container
                      }}>
                      PB and J
                    </Typography>
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      The timeless classic!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Container>
          <Container sx={{ paddingY: 4 }}>
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
