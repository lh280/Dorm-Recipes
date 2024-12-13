import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { Button, Container, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";

import Header from "@/components/Header";
import RecipesView from "@/components/RecipesView";

export default function Search({ setCurrentRecipe, viewAccount }) {
  const router = useRouter();
  // initialize states
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const mTheme = useTheme();
  const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));

  useEffect(() => {
    const { q } = router.query;
    if (q) {
      setQuery(encodeURIComponent(q));
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

  const title = `Dorm Recipes | Search results for "${decodeURIComponent(query)}"`;
  const toHome = "\u2B05 to home";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main style={{ paddingTop: '80px' }}>
          <Header setCurrentRecipe={setCurrentRecipe} viewAccount={viewAccount} />
          <Container sx={{ paddingY: 4 }}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleReturn} sx={{ marginBottom: 0, bgcolor: '#201f54' }}>
                  {toHome}
                </Button>
              </Grid>
              <Grid item xs={12}>
                {isMobile ? <h3 style={{ margin: 0 }}>Search results for &quot;{decodeURIComponent(query)}&quot;</h3> : <h1 style={{ margin: 0 }}>Search results for &quot;{decodeURIComponent(query)}&quot;</h1>}
              </Grid>
              <Grid item xs={12}>
                {recipes.length > 0 ? (
                  <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe} />
                ) : (
                  <p style={{ margin: 0 }}>{recipes.length === 0 ? `No matching recipes found for "${decodeURIComponent(query)}"` : "An error occurred while fetching recipes."}</p>
                )}
              </Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

Search.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  viewAccount: PropTypes.func
};
