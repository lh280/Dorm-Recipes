/*
  SearchBar.js

  This module provides a search bar that allows the user to 
  search the available recipes and select one for display. 

   props:
    setCurrentRecipe - Function to call set current recipe to display
*/

import { useState } from "react";

import {TextField, Box} from "@mui/material";

import PropTypes from "prop-types";

export default function SearchBar({ onSearch }) {
  // initialize states
  const [search, setSearch] = useState("");

  const handleButton = () => {
    if(search) {
      onSearch(search);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter' && search) {
      onSearch(search);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField
          type="text"
          placeholder="🔍 Search for a recipe..."
          value={search}
          variant="standard"
          onChange={(s) => setSearch(s.target.value)}
          onKeyDown={handleEnter}
        />
        <button type="button" onClick={handleButton}>Search</button>
      </Box>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};