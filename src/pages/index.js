import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SearchBar from "@/components/SearchBar";
import UserShape from "@/components/UserShape";
import Header from "../components/Header";
import Section from "../components/Section";
import theme from "../material/theme";


export default function Home({ setCurrentRecipe, currentUser, viewAccount}) {
  const router = useRouter();

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

  // tempSections does not represent the actual composition of a section object
  const tempSections = [{ title: "Breakfasts:" }, { title: "Desserts:" }];
  const sections = tempSections.map(({ title }) => (<Section key = {title} title={title} recipes={testRecipes} openRecipe={setCurrentRecipe} />)); // Using current Recipe as a place holder

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
                <SearchBar setCurrentRecipe={()=>{}}/>
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
                <Button variant="contained" onClick={() => {setCurrentRecipe(1)}}>Recipe 1</Button>
                <Button variant="contained" onClick={() => {setCurrentRecipe(2)}}>Recipe 2</Button>
                <Button variant="contained" onClick={() => {setCurrentRecipe(3)}}>Recipe 3</Button>
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
