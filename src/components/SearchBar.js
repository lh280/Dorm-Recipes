/*
  SearchBar.js

  This module provides a search bar that allows the user to 
  search the available recipes and select one for display. 

   props:
    onSearch - Function to call with search to query api and retrieve recipes
*/

import { useState } from "react";

import {TextField, Box} from "@mui/material";
import Button from "@mui/material/Button";

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
          sx={{
            width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '600px'
          }}
          InputProps={{
            sx: {
              fontSize: '1.15rem', // Adjust this value as needed for the desired size
            }
          }}
        />
        <Button type="button" onClick={handleButton}>Search</Button>
      </Box>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};