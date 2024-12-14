import { render, screen } from "@testing-library/react";
import Section from "./Section";


jest.mock("next-auth/react");


describe("Section: Testing sections", () => {
  let recipes;
  const handler = jest.fn();

  beforeEach(() => {
    // Updated mock recipes to keep the same structure but
    // remember: your actual <RecipeCard> doesn't display ingredient lines or "Image of X" alt text.
    recipes = [
      {
        recipe_id: 0,
        img: "/pbj.jpg",
        title: "PB & J Sandwich",
        author: "Noah Price",
        prep_time: 15,
        servings: 1,
        user_id: 0,
        description: "This is a description.",
        recipe_ingredient: [
          { ingredient_id: 1, quantity: 2, unit: "slices", ingredient_name: "Bread" },
          { ingredient_id: 2, quantity: 1, unit: "jar", ingredient_name: "Peanut Butter" },
          { ingredient_id: 3, quantity: 1, unit: "jar", ingredient_name: "Jelly" },
        ],
        recipe_reviews: [],
        instructions: "Apply the peanut butter... Close the sandwich.",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        recipe_id: 1,
        img: "/pbj2.jpg",
        title: "PB & J Sandwich 2",
        author: "Grayson",
        prep_time: 10,
        servings: 2,
        user_id: 1,
        description: "A variation of the classic PB & J.",
        recipe_ingredient: [
          { ingredient_id: 4, quantity: 4, unit: "slices", ingredient_name: "Bread" },
          { ingredient_id: 5, quantity: 2, unit: "tbsp", ingredient_name: "Peanut Butter" },
          { ingredient_id: 6, quantity: 2, unit: "tbsp", ingredient_name: "Jelly" },
        ],
        recipe_reviews: [],
        instructions: "Spread peanut butter... Combine to make two sandwiches.",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ];
    handler.mockReset();
  });

  test("All recipes in the section render with the correct title", () => {
    render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
    recipes.forEach((rec) => {
      // Ensure the recipe title is displayed
      expect(screen.getByRole("heading", { name: rec.title })).toBeInTheDocument();
    });
  });

  test("Renders the correct number of recipes", () => {
    render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
    const recipeCards = screen.getAllByRole("button");
    expect(recipeCards.length).toBe(recipes.length);
  });

  test("Each card displays the correct image alt text", () => {
    render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);

    // If your code uses alt="Picture of the recipe", test that directly:
    const images = screen.getAllByAltText("Picture of the recipe");
    // Expect one image per recipe
    expect(images.length).toBe(recipes.length);
  });

  test("Displays no recipes when the recipes list is empty", () => {
    render(<Section title="Test Section" recipes={[]} openRecipe={handler} />);
    // No recipe card => no "button" role
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("Displays the correct section title", () => {
    const title = "Test Section";
    render(<Section title={title} recipes={recipes} openRecipe={handler} />);
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  /** 
   * Matches snapshot 
   * 
   * If you still want snapshot testing, run `npm test -- -u` (or `yarn test -u`) 
   * to update after making test changes.
   */
  test("Matches snapshot", () => {
    const { container } = render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
    expect(container).toMatchSnapshot();
  });

  test("Handles a long list of recipes", () => {
    const longRecipes = Array.from({ length: 50 }, (_, index) => ({
      recipe_id: index,
      img: `/recipe-${index}.jpg`,
      title: `Recipe ${index}`,
      author: "Test Author",
      prep_time: 10,
      servings: 2,
      user_id: index,
      description: `Description for Recipe ${index}`,
      recipe_ingredient: [
        { ingredient_id: index, quantity: 2, unit: "pieces", ingredient_name: `Ingredient ${index}` },
      ],
      recipe_reviews: [],
      instructions: `Step 1 for Recipe ${index}.\nStep 2 for Recipe ${index}.`,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }));

    render(<Section title="Long Test Section" recipes={longRecipes} openRecipe={handler} />);

    // Title check
    longRecipes.forEach((rec) => {
      expect(screen.getByRole("heading", { name: rec.title })).toBeInTheDocument();
    });
    // The code only shows 1 image + title. Ingredients aren't rendered, so skip that test.

    // 50 clickable cards
    expect(screen.getAllByRole("button").length).toBe(50);
  });
});
