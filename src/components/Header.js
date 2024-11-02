import PropTypes from "prop-types";

export default function Header({ setCurrentRecipe }) {
  const goToAccount = () => {
    // send user to acount view
  };
  const goHome = () => {
    setCurrentRecipe();
  };
  return (
    <div>
      <h1 onClick={goHome}>
        Dorm Recipes
        <span>
          <button type="button" onClick={goToAccount}>
            account
          </button>
        </span>
      </h1>
    </div>
  );
}

Header.propTypes = {
  setCurrentRecipe: PropTypes.func.isRequired,
};
