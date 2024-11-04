/*
  RatingShape.js

  This provides a PropTypes descriptor of rating objects. This is pulled out
  since multiple components take ratings as props.
*/

import PropTypes from "prop-types";

const RatingShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  recId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
});

export default RatingShape;
