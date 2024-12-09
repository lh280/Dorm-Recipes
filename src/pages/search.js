import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";

import Header from "@/components/Header";
import UserShape from "@/components/UserShape";
import RecipesView from "@/components/RecipesView";

export default function Search({ setCurrentRecipe, currentUser, viewAccount }) {
  const router = useRouter();
  // initialize states
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const { q } = router.query;
    if (q) {
      setQuery(q);
    }
  }, [router.query]);

  useEffect(() => {
    if (!query) {
      return;
    } 

    const getRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes?q=${query}`);
      
        if (!response.ok) {
          if (response.status === 404) {
            setRecipes([]); 
          } else {
            throw new Error(`Failed to fetch recipes: ${response.status}`);
          }
          return; 
        }
  
        const recs = await response.json();
        setRecipes(recs);
      } catch (error) {
        console.error("Failed to fetch recipes:", error.message); // eslint-disable-line
        setRecipes([]); 
      }
    }
    
    getRecipes();
  }, [query]);

  const handleReturn = (() => {
    router.push(`/`);
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main style={{ paddingTop: '80px' }}>
          <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={viewAccount} />
          <Container sx={{ paddingY: 4 }}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Button variant="outlined" onClick={handleReturn} sx={{ marginBottom: 0 }}>
                  🔙 To home
                </Button>
              </Grid>
              <Grid item xs={12}>
                <h1 style={{ margin: 0 }}>Search results for &quot;{query}&quot;</h1>
              </Grid>
              <Grid item xs={12}>
                {recipes.length > 0 ? (
                  <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe} />
                ) : (
                  <p style={{ margin: 0 }}>{recipes.length === 0 ? `No matching recipes found for "${query}"` : "An error occurred while fetching recipes."}</p>
                )}
              </Grid>
            </Grid>
          </Container>
      </main>
    </ThemeProvider>
  );
}

Search.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
