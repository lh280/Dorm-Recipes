import { render, screen} from "@testing-library/react";
import RecipesView from "./RecipesView";

describe("RecipesView: Recipes View tests (Part of search bar?)", () => {
  const handler = jest.fn();
  let recipes;

  beforeEach(() => {
    recipes = [
      {
        recipe_id: 0,
        img: "/pbj.jpg",
        title: "PB & J Sandwich",
        author: "Noah Price",
        time: 15,
        rating: 3,
        servings: 1,
        user_id: 0,
        description: "This is a description.",
        recipe_ingredient: [
          { ingredient_id: 1, quantity: 2, unit: "slices", ingredient_name: "Bread" },
          { ingredient_id: 2, quantity: 1, unit: "jar", ingredient_name: "Peanut Butter" },
          { ingredient_id: 3, quantity: 1, unit: "jar", ingredient_name: "Jelly" },
        ],
        instructions: "Apply the peanut butter... Close the sandwich.",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      {
        recipe_id: 1,
        img: "/pbj.jpg",
        title: "PB & J Sandwich 2",
        author: "Yahya",
        time: 15,
        rating: 3,
        servings: 1,
        user_id: 0,
        description: "This is also a description.",
        recipe_ingredient: [
          { ingredient_id: 1, quantity: 2, unit: "slices", ingredient_name: "Bread" },
          { ingredient_id: 2, quantity: 1, unit: "jar", ingredient_name: "Peanut Butter" },
          { ingredient_id: 3, quantity: 1, unit: "jar", ingredient_name: "Jelly" },
        ],
        instructions: "Apply the peanut butter... Close the sandwich.",
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    ];
    handler.mockReset();
  });

  test("RecipesView displays each recipe title", () => {
    render(<RecipesView recipes={recipes} setCurrentRecipe={handler} />);
    recipes.forEach((rec) => {
      expect(screen.getByText(rec.title)).toBeInTheDocument();
    });
  });

  test("All recipe titles are rendered correctly", () => {
    render(<RecipesView recipes={recipes} setCurrentRecipe={handler} />);
  
    recipes.forEach((rec) => {
      expect(screen.getByText(rec.title)).toBeInTheDocument();
    });
  });

  test("RecipesView displays all recipes", () => {
    render(<RecipesView recipes={recipes} setCurrentRecipe={jest.fn()} />);
    
    recipes.forEach((recipe) => {
      expect(screen.getByText(recipe.title)).toBeVisible();
    });
  });

  test("Props are not mutated", () => {
    const originalRecipes = [...recipes];
    render(<RecipesView recipes={originalRecipes} setCurrentRecipe={jest.fn()} />);
    
    expect(recipes).toEqual(originalRecipes);
  });

  test("Displays updated recipe information", () => {
    const updatedRecipes = [
      { ...recipes[0], title: "Updated PB & J Sandwich" },
      ...recipes.slice(1),
    ];
    const { rerender } = render(
      <RecipesView recipes={recipes} setCurrentRecipe={jest.fn()} />
    );
  
    rerender(<RecipesView recipes={updatedRecipes} setCurrentRecipe={jest.fn()} />);
  
    expect(screen.getByText("Updated PB & J Sandwich")).toBeVisible();
  });
});