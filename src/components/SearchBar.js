/*
  SearchBar.js

  This module provides a search bar that allows the user to 
  search the available recipes and select one for display. 

   props:
    onSearch - Function to call with search to query api and retrieve recipes
*/

import { useState } from "react";

import { TextField, Box } from "@mui/material";
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
      <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', maxWidth: '800px' }}>
        <TextField
          type="text"
          placeholder="🔍 Search for a recipe..."
          value={search}
          variant="standard"
          onChange={(s) => setSearch(s.target.value)}
          onKeyDown={handleEnter}
          sx={{
            width: '100%',
            maxWidth: '600px',
            "& .MuiInputBase-root": {
              borderBottom: "1px solid grey", 
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "grey", 
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white", 
            },
            input: { color: "white" },
          }}
          InputProps={{
            sx: {
              fontSize: '1.15rem', 
            }
          }}
        />
        <Button type="button" onClick={handleButton}
          sx={{
            backgroundColor: "#201f54", 
            color: "white",
            "&:hover": {
              backgroundColor: "#3f3d89", 
            }
          }}>
            Search
          </Button>
      </Box>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};