/*
  SearchBar.js

  This module provides a search bar that allows the user to 
  search the available recipes and select one for display. 

   props:
    setCurrentRecipe - Function to call set current recipe to display
*/

import { useRouter } from "next/router";
import { useState } from "react";

import {TextField, Box} from "@mui/material";

export default function SearchBar() {
  const router = useRouter();
  // initialize states
  const [search, setSearch] = useState("");

  const handleSearch = (q) => {
    if(q) {
      setSearch(q);
      router.push(`/search?q=${search}`);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${search}`);
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
        <button type="button" onClick={handleSearch}>Search</button>
      </Box>
    </div>
  );
}
