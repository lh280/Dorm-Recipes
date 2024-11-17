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
import SearchIcon from '@mui/icons-material/Search';
import {TextField, Box} from "@mui/material";
import RecipesView from "./RecipesView";
import Search from "./Search";

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
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ fontSize: 40 }}/>
        <TextField
          type="text"
          placeholder="🔍 Search for a recipe..."
          value={search}
          variant="standard"
          onChange={(s) => setSearch(s.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
        {/* <Search handleSearch={handleSearch} currentSearch={search} setCurrentSearch={setSearch} /> */}
        <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe} />
      </Box>
    </div>
  );
}

SearchBar.propTypes = {
  // currentArticle: ArticleShape,
  setCurrentRecipe: PropTypes.func.isRequired,
};
