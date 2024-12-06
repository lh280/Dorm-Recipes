import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import UserShape from "@/components/UserShape";

import PropTypes from "prop-types";

import Header from "../components/Header";

import RecipesView from "../components/RecipesView";

export default function Search({ setCurrentRecipe, currentUser, viewAccount}) {
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
        fetch(`/api/recipes?q=${q}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch recipes: ${response.status}`);
          }
        return response.json();
        })
        .then((recs) => {
          setRecipes(recs);
        })
      } catch (error) {
        console.error(`Failed to fetch recipes:`, error.message); // eslint-disable-line
        setRecipes();
      }
    };
    
    getRecipes();
  }, [q]); 

  const handleReturn = (() => {
    router.back();
  })

  return (
    
    <div>
      <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={viewAccount}/>
      <button type="button" onClick={handleReturn}>🔙</button>
      <div>
        <h1>Search results for &quot;{q}&quot;</h1>
        {recipes ? (
          <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe}/>
        ) : (
          <p>No matching recipes found for &quot;{q}&quot;</p>
        )}
      </div>
    </div>
  );
}

Search.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
  currentUser: UserShape,
  viewAccount: PropTypes.func
};
