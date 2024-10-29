import Head from "next/head";
import Header from "../components/Header";
import Section from "../components/Section";

export default function Home() {
  // tempSections does not represent the actual composition of a section object
  const tempSections = [{ title: "Breakfasts:" }, { title: "Desserts:" }];
  const openRecipe = (id) => {
    // TODO handle pass to recipe page
    console.log(id); // left in for verification
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
        <Header />
        <form>
          <input type="text" placeholder="Search Recipes" name="search" />
        </form>
        <button type="button">Add Recipe</button>
        <div
          onClick={() => {
            openRecipe("no id yet");
          }}
        >
          <h2>Featured Recipe:</h2>
          <img src="REPLACE ME" height="350" width="350" />
          <h4>Recipe title</h4>
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
