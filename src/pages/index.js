import Image from "next/image";
import PropTypes from "prop-types";
import Head from "next/head";
import Header from "../components/Header";
import Section from "../components/Section";
import RecipeShape from "../components/RecipeShape";

export default function Home({ setCurrentRecipe, currentRecipe }) {
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="Dorm Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Header setCurrentRecipe={setCurrentRecipe} />
        <form>
          <input type="text" placeholder="Search Recipes" name="search" />
        </form>
        <button type="button">Add Recipe</button>
        <div
          onClick={() => {
            openRecipe();
          }}
        >
          <h2>Featured Recipe:</h2>
          <Image src={currentRecipe.img} height="350" width="350" />
          <h4>{currentRecipe.title}</h4>
          <p>
            This is the recipe description This is the recipe description This
            is the recipe description This is the recipe description This is the
            recipe description This is the recipe description This is the recipe
            description This is the recipe description This is the recipe
            description This is the recipe description
          </p>
        </div>
        {sections}
      </main>
    </>
  );
}

Home.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentRecipe: RecipeShape,
};
