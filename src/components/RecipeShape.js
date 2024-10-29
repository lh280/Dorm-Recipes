/*
  RecipeShape.js

  This provides a PropTypes descriptor of recipe objects. This is pulled out
  since multiple components take recipes as props.
*/

import PropTypes from "prop-types";

const RecipeShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    steps: PropTypes.string.isRequired,
    edited: PropTypes.string.isRequired,
});

export default RecipeShape;