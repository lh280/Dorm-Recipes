import { useRouter } from "next/router"; 
import Head from "next/head";
import Header from "../components/Header";
import Section from "../components/Section";

export default function Home() {
  const router = useRouter();

  const tempSections = [{ title: "Breakfasts:" }, { title: "Desserts:" }];
  const openRecipe = (id) => {
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
        <button type="button" onClick={() => router.push("/add-recipe")}>
          Add Recipe
        </button>
        <div
          onClick={() => {
            openRecipe("no id yet");
          }}
        >
          <h2>Featured Recipe:</h2>
          <img src="REPLACE ME" height="350" width="350" />
          <h4>Recipe title</h4>
          <p>
            This is the recipe description. Replace with actual content as needed.
          </p>
        </div>
        {sections}
      </main>
    </>
  );
}
