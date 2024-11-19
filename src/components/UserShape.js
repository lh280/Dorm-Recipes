import PropTypes from "prop-types";

const UserShape = PropTypes.shape({
    user_id: PropTypes.number,
    email: PropTypes.string,
    created_at: PropTypes.string
});

export default UserShape;