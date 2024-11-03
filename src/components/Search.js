/*
  Search.js

  This component fetches the user's search from the database.

   props:
    search - the search parameters
*/

import PropTypes from "prop-types";

export default function Search({ search }) {
  const getSearch = async () => {
    if (!search) return [];
    try {
      const response = await fetch(
        `/search?q=${encodeURIComponent(search)}`, // TODO: set API routes - connect to database & confirm routing for recipe retrieval
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(`Failed to fetch recipes:`, error.message); // eslint-disable-line
      return [];
    }
  };

  return getSearch();
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  currentSearch: PropTypes.string,
  setCurrentSearch: PropTypes.func.isRequired,
};
