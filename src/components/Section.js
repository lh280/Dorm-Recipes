export default function Section(title, openRecipe) {
  const tempRecipeIds = ["id1", "id2"];

  const recipes = tempRecipeIds.map((id) => (
    <li
      key={id}
      onClick={() => {
        openRecipe();
      }}
    >
      <img src="REPLACE ME" width="200" height="200" />{" "}
      {/* eslint-disable-line */}
      <div>recipe title</div>
    </li>
  ));

  return (
    <div>
      <h2>{title}</h2>
      <div id="image list">
        <div>
          <ul>{recipes}</ul>
        </div>
      </div>
    </div>
  );
}
