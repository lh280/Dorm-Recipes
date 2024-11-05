import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
  // tempSections does not represent the actual composition of a section object
  const tempSections = [{ title: "Breakfasts:" }, { title: "Desserts:" }];
  const openRecipe = () => {
    const recipe = currentRecipe; // TODO: Replace with database recipe
    setCurrentRecipe(recipe);
  };
  const sections = tempSections.map(({ title }) => Section(title, openRecipe));

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <main>
                <Header setCurrentRecipe={setCurrentRecipe} />
              <form>
                <input type="text" placeholder="Search Recipes" name="search" />
              </form>
              <button type="button" onClick={() => router.push("/add-recipe")}>
                Add Recipe
              </button>
              <div
                onClick={() => {
                  openRecipe();
                }}
              >
                <h2>Featured Recipe:</h2>
                <Image src={currentRecipe.img} height="350" width="350" />
                <h4>{currentRecipe.title}</h4>
                <p>
                  This is the recipe description. Replace with actual content as needed.
                </p>
              </div>
              {sections}
            </main>
        </ThemeProvider>
        
    </div>
  );
}

Home.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentRecipe: RecipeShape,
};
