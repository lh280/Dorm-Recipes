import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import UserShape from "@/components/UserShape";

import PropTypes from "prop-types";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipesView from "../components/RecipesView";

export default function Search({ setCurrentRecipe, currentUser, viewAccount}) {
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
  
  const handleSearch = (q) => {
    router.push(`/search?q=${q}`); 
  };

  const handleReturn = (() => {
    router.back();
  })

  return (
    
    <div>
      <Header setCurrentRecipe={setCurrentRecipe} currentUser={currentUser} viewAccount={viewAccount}/>
      <SearchBar onSearch={handleSearch}/>
      <button type="button" onClick={handleReturn}>🔙</button>
      <div>
        <h1>Search results for &quot;{query}&quot;</h1>
        {recipes.length > 0 ? (
          <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe}/>
        ) : ( 
          <p>{recipes.length === 0 ? `No matching recipes found for "${query}"` : "An error occurred while fetching recipes."}</p>
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
