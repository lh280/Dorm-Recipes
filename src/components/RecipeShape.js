/*
  RecipeShape.js

  This provides a PropTypes descriptor of recipe objects. This is pulled out
  since multiple components take recipes as props.
*/

import PropTypes from "prop-types";

const RecipeShape = PropTypes.shape({
  recipe_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  prep_time: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
});

export default RecipeShape;
