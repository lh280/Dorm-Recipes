import { render, screen, fireEvent } from "@testing-library/react";
import RecipesView from "./RecipesView";

describe("RecipesView: Recipes View tests (Part of search bar?)", () => {
  const handler = jest.fn();
  let recipes;

  beforeEach(() => {
    recipes = [
      {
        id: 0,
        img: "/pbj.jpg",
        title: "PB & J Sandwich",
        author: "Noah Price",
        time: "< 15 minutes",
        rating: "3.5 out of 5",
        ingredients: [
          "2 slices of bread",
          "1 jar of peanut butter",
          "1 jar of jelly",
        ],
        steps: [
          "Apply the peanut butter to one of the slices of bread.",
          "Apply the jelly to the other slice.",
          "Close the sandwich.",
        ],
        edited: "2024-11-02",
      },
      {
        id: 1,
        img: "/pbj.jpg",
        title: "PB & J Sandwich 2",
        author: "Grayson",
        time: "< 15 minutes",
        rating: "3.5 out of 5",
        ingredients: [
          "4 slices of bread",
          "1 jar of peanut butter",
          "1 jar of jelly",
        ],
        steps: [
          "Apply the peanut butter to one of the slices of bread.",
          "Apply the jelly to the other slice.",
          "Close the sandwich.",
        ],
        edited: "2024-11-02",
      },
    ];
    handler.mockReset();
  });

  test("RecipesView displays the correct information", () => {
    render(<RecipesView recipes={recipes} />);
    recipes.forEach((rec) => {
      expect(screen.queryByRole("paragraph", { name: rec.id }));
      expect(screen.queryByRole("paragraph", { name: rec.rating }));
      expect(screen.queryByRole("paragraph", { name: rec.title }));
      expect(screen.queryByRole("paragraph", { name: rec.time }));
    });
  });

  test("Clicking a recipe calls setCurrentRecipe with the correct recipe", () => {
    render(<RecipesView recipes={recipes} setCurrentRecipe={handler} />);

    const recipeTitle = screen.getByText("PB & J Sandwich");
    fireEvent.click(recipeTitle);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(recipes[0]);
  });

  // the following tests will check if the recipe titles are rendered correctly, and then if all recipes are displayed correctly.
  test("All recipe titles are rendered correctly", () => {
    render(<RecipesView recipes={recipes} />);
  
    recipes.forEach((rec) => {
      // Check if each recipe title is displayed on the screen
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
      <RecipesView recipes={recipes} setCurrentRecipe={jest.fn()} />,
    );
  
    rerender(
      <RecipesView recipes={updatedRecipes} setCurrentRecipe={jest.fn()} />,
    );
  
    expect(screen.getByText("Updated PB & J Sandwich")).toBeVisible();
  });
});