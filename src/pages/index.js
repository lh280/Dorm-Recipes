import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchBar from "@/components/SearchBar";
import RecipeShape from "../components/RecipeShape";
import Header from "../components/Header";
import Section from "../components/Section";
// TODO: delete - comment for commit sprint1
import theme from "../material/theme";


export default function Home({ setCurrentRecipe, currentRecipe }) {
  const router = useRouter();
  if (!currentRecipe) {
    return <div>Loading</div>; // Temporary fix: will be removed once DB is integrated
  }

  const testRecipes = [{
            id: 0,
            img: "/pbj.jpg",
            title: "PB & J Sandwich",
            author: "Noah Price",
            time: "< 15 minutes",
            rating: "3.5 out of 5",
            ingredients: [
              "2 slices of bread",
              "1 jar of peanut butter",
              "1 jar of jelly",
            ],
            steps: [
              "Apply the peanut butter to one of the slices of bread.",
              "Apply the jelly to the other slice.",
              "Close the sandwich.",
            ],
            edited: "2024-11-02",
        },{
            id: 1,
            img: "/pbj.jpg",
            title: "PB & J Sandwich 2",
            author: "Grayson",
            time: "< 15 minutes",
            rating: "3.5 out of 5",
            ingredients: [
              "4 slices of bread",
              "1 jar of peanut butter",
              "1 jar of jelly",
            ],
            steps: [
              "Apply the peanut butter to one of the slices of bread.",
              "Apply the jelly to the other slice.",
              "Close the sandwich.",
            ],
            edited: "2024-11-02",
        }]


  // tempCurrentUser is not finalized, should be replaced later
  const tempCurrentUser = "Z"

  // tempSections does not represent the actual composition of a section object
  const tempSections = [{ title: "Breakfasts:" }, { title: "Desserts:" }];
  const openRecipe = () => {
    const recipe = currentRecipe; // TODO: Replace with database recipe
    setCurrentRecipe(recipe);
  };
  const sections = tempSections.map(({ title }) => (<Section key = {title} title={title} recipes={testRecipes} openRecipe={openRecipe} />)); // Using current Recipe as a place holder

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
              <Header setCurrentRecipe={setCurrentRecipe} currentUser={tempCurrentUser} />
              <Container>
                <SearchBar setCurrentRecipe={()=>{}}/>
                <Button variant="contained" onClick={() => router.push("/add-recipe")}>Add Recipe</Button>
              </Container>
              <Container>
                <Typography variant="h2">Featured Recipe:</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid onClick={() => {openRecipe()}} container spacing={2}>
                    <Grid>
                      <Image src={currentRecipe.img} height="325" width="325" />
                    </Grid>
                    <Grid size = {4}>
                      <Typography variant="h5">{currentRecipe.title}</Typography>
                      <Typography variant="body1">This is the recipe description. Replace with actual content as needed.</Typography>
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
  currentRecipe: RecipeShape,
};
