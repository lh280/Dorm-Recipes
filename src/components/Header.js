export default function Header() {
  const goToAcount = () => {
    // send user to acount view
  };
  return (
    <div>
      <h1>
        Dorm Recipes
        <span>
          <button type="button" onClick={goToAcount}>
            account
          </button>
        </span>
      </h1>
    </div>
  );
}
