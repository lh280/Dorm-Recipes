import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import RecipesView from "../components/RecipesView";

export default function Search({ setCurrentRecipe }) {
  const router = useRouter();
  // initialize states
  const [recipes, setRecipes] = useState([]);

  const { q } = router.query;

  useEffect(() => {
    if (!q) {
      return;
    } 

    const getRecipes = async () => {
      try {
        const response = await fetch(`/search?q=${q}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        }
        const json = await response.json();
        setRecipes(json);
      } catch (error) {
        console.error(`Failed to fetch recipes:`, error.message); // eslint-disable-line
        setRecipes();
      }
    };
    
    getRecipes();
  }, [q]); // eslint-disable-line

  return (
    <div>
      <h1>Search results for &quot;{q}&quot;</h1>
      {recipes ? (
        <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe}/>
      ) : (
        <p>No matching recipes found for &quot;{q}&quot;</p>
      )}
    </div>
  );
}

Search.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
};
