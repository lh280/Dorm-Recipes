import PropTypes from "prop-types";
import RecipeShape from "./RecipeShape";
import ReviewShape from "./ReviewShape";

const UserInfoShape = PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user_recipes: PropTypes.arrayOf(RecipeShape),
    user_reviews: PropTypes.arrayOf(ReviewShape)
});

export default UserInfoShape;