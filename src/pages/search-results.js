// import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import {TextField, Box} from "@mui/material";
import RecipesView from "../components/RecipesView";
import Search from "../components/SearchFunc";

export default function SearchBar({ setCurrentRecipe }) {
//   const router = useRouter();
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
        <TextField
          type="text"
          placeholder="🔍 Search for a recipe..."
          value={search}
          variant="standard"
          onChange={(s) => setSearch(s.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
        <RecipesView recipes={recipes} setCurrentRecipe={setCurrentRecipe} /> {/* TODO: delete- instead send current articles to main? */}
      </Box>
    </div>
  );
}

SearchBar.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
};
