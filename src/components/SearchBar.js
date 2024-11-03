/*
  SearchBar.js

  This module provides a search bar that allows the user to 
  search the available recipes and select one for display. 

   props:
    setCurrentRecipe - Function to call set current recipe to display
    // currentRecipe - The recipe to render
*/

import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import RecipesView from "./RecipesView";
import Search from "./Search";
// import RecipeShape from "./RecipeShape";

export default function SearchBar({ setCurrentRecipe /* currentRecipe */ }) {
  // initialize states
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    const result = await Search(search);
    setRecipes(result);
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search]); // eslint-disable-line

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(s) => setSearch(s.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {/* <Search handleSearch={handleSearch} currentSearch={search} setCurrentSearch={setSearch} /> */}
      <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe} />
    </div>
  );
}

SearchBar.propTypes = {
  // currentArticle: ArticleShape,
  setCurrentRecipe: PropTypes.func.isRequired,
};
