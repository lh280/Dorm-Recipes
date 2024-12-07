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
        fetch(`/api/recipes?q=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch recipes: ${response.status}`); // TODO: fix how catching error here - catching the 404 when no matching recipes but no longer displaying the placeholder text
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
        {recipes ? (
          <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe}/>
        ) : ( 
          <p>No matching recipes found for &quot;{query}&quot;</p>
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
