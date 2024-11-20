import PropTypes from "prop-types";

const ReviewShape = PropTypes.shape({
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    recipe_id: PropTypes.number.isRequired,
    review_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired
})

export default ReviewShape