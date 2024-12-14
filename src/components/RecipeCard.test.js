import { render, screen, fireEvent } from "@testing-library/react";
import RecipeCard from "./RecipeCard";



describe("RecipeCard component", () => {
  const handler = jest.fn();
  afterEach(() => {
    handler.mockReset();
  });

  test("Renders loading message if no recipe is passed", () => {
    
    render(<RecipeCard recipe={null} setCurrentRecipe= {handler}/>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Renders with default size (200) if size is not provided", () => {
    const recipe = { recipe_id: 1, title: "Dummy Recipe" };
    render(<RecipeCard recipe={recipe} setCurrentRecipe= {handler}/>);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "200");
  });

  test("Uses custom size when provided", () => {
    const recipe = { recipe_id: 1, title: "Sized Recipe", img: "/test.jpg" };
    render(<RecipeCard recipe={recipe} setCurrentRecipe= {handler} size={300}/>);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "300");
  });

  test("Displays the correct recipe title", () => {
    const recipe = { recipe_id: 10, title: "PB & Jelly" };
    render(<RecipeCard recipe={recipe} setCurrentRecipe= {handler}/>);

    expect(screen.getByText("PB & Jelly")).toBeInTheDocument();
  });

  test("Uses fallback image if recipe.img is not provided", () => {
    const recipe = { recipe_id: 2, title: "Fallback Test" };
    render(<RecipeCard recipe={recipe} setCurrentRecipe= {handler}/>);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img.src).toMatch("http://localhost/_next/image?url=%2Ffood1.jpg&w=640&q=75");
  });

  test("Clicking the card calls setCurrentRecipe with recipe.recipe_id", () => {
    const recipe = { recipe_id: 77, title: "Click Test" };
    render(<RecipeCard recipe={recipe} setCurrentRecipe= {handler}/>);

    const card = screen.getByTestId("recipe");
    fireEvent.click(card);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(recipe.recipe_id);
  });
});