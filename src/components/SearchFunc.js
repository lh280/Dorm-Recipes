/*
  SearchFunc.js

  This function fetches the user's search from the api.

   props:
    search - the search parameters
*/

import PropTypes from "prop-types";

export default function Search({ search }) {
  const getSearch = async () => {
    if (!search) return [];
    try {
      const response = await fetch(
        `/search?q=${search}`, 
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
