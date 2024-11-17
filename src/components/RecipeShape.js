/*
  RecipeShape.js

  This provides a PropTypes descriptor of recipe objects. This is pulled out
  since multiple components take recipes as props.
*/

import PropTypes from "prop-types";

const RecipeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  servings: PropTypes.number,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  edited: PropTypes.string.isRequired,
});

export default RecipeShape;
