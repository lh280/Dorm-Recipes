import PropTypes from "prop-types";
import Head from "next/head";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { Typography, Box, Button, Container, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";

import Section from "@/components/Section";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";

export default function Home({ setCurrentRecipe, viewAccount }) {
  const { data: session, status } = useSession(); // eslint-disable-line no-unused-vars
  const disabled = status !== "authenticated";
  const router = useRouter();

  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  const mTheme = useTheme();
  const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));

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

        const featured = data.find(recipe => recipe.recipe_id === 0);
        setFeaturedRecipe(featured);

      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error retrieving recipes")
      };
    })()
  }, []);

  let sections = <div>Loading...</div>

  if (fetchedRecipes) {
    let demoSections = [{ title: "All Recipes", recipes: fetchedRecipes }];
    if (fetchedRecipes.length > 4) {
      const newRecipes = fetchedRecipes.slice(0, 4)
      const oldRecipes = fetchedRecipes.slice(fetchedRecipes.length - 4, fetchedRecipes.length);
      demoSections = [{ title: "Newest Recipes", recipes: newRecipes }, { title: "Oldest Recipes", recipes: oldRecipes }];
    }
    sections = demoSections.map(({ title, recipes }) => (<Section key={title} title={title} recipes={recipes} openRecipe={setCurrentRecipe} />));
  }

  const msg = disabled ? "Sign in to post a new recipe" : "";

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
          <Header setCurrentRecipe={setCurrentRecipe} viewAccount={() => { viewAccount(session.user.id) }} />
          <Container sx={{ paddingY: 0 }}>
            <Box display="flex" justifyContent="center" marginTop={4} >
              <Tooltip title={msg} slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [160, -49],
                      },
                    },
                  ],
                },
              }}>
                <span>
                  <Button
                    variant="contained"
                    onClick={() => router.push("/add-recipe")}
                    sx={{ padding: '10px 20px', bgcolor: '#201f54' }}
                    disabled={disabled}
                  >
                    Add Recipe
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Container>
          <Container sx={{ paddingY: 1 }}>
            <Typography variant={isMobile ? "h4" : "h3"} gutterBottom>
              Featured Recipe
            </Typography>
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              sx={{ height: "auto", textAlign: "center" }} 
            >
              {featuredRecipe ? (
                <RecipeCard recipe={featuredRecipe} setCurrentRecipe={setCurrentRecipe} size={275} />
              ) : (
                <Typography>Loading featured recipe...</Typography>
              )}
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
  viewAccount: PropTypes.func
};
