import { render, screen, fireEvent } from "@testing-library/react";
import makeRecipeCard from "./RecipeCard";

describe("makeRecipeCard component", () => {
  const handler = jest.fn();

  afterEach(() => {
    handler.mockReset();
  });

  test("Renders loading message if no recipe is passed", () => {
    render(makeRecipeCard({ recipe: null, setCurrentRecipe: handler }));
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Renders with default size (200) if size is not provided", () => {
    const recipe = { recipe_id: 1, title: "Dummy Recipe" };
    render(makeRecipeCard({ recipe, setCurrentRecipe: handler }));

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "200");
  });

  test("Uses custom size when provided", () => {
    const recipe = { recipe_id: 1, title: "Sized Recipe", img: "/test.jpg" };
    render(makeRecipeCard({ recipe, setCurrentRecipe: handler, size: 300 }));

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "300");
  });

  test("Displays the correct recipe title", () => {
    const recipe = { recipe_id: 10, title: "PB & Jelly" };
    render(makeRecipeCard({ recipe, setCurrentRecipe: handler }));

    expect(screen.getByText("PB & Jelly")).toBeInTheDocument();
  });

  test("Uses fallback image if recipe.img is not provided", () => {
    const recipe = { recipe_id: 2, title: "Fallback Test" };
    render(makeRecipeCard({ recipe, setCurrentRecipe: handler }));

    const img = screen.getByAltText("Picture of the recipe");
    expect(img.src).toMatch(/food\.jpg/);
  });

  test("Clicking the card calls setCurrentRecipe with recipe.recipe_id", () => {
    const recipe = { recipe_id: 77, title: "Click Test" };
    render(makeRecipeCard({ recipe, setCurrentRecipe: handler }));

    const card = screen.getByTestId("recipe");
    fireEvent.click(card);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(recipe.recipe_id);
  });
});