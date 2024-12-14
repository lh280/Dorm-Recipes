import { render, screen, fireEvent } from "@testing-library/react";
import RecipeCard from "./RecipeCard";



describe("RecipeCard component", () => {
  const handler = jest.fn();
  afterEach(() => {
    handler.mockReset();
  });

  test("Renders loading message if no recipe is passed", () => {

    render(<RecipeCard recipe={null} setCurrentRecipe={handler} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Renders with default size (200) if size is not provided", () => {
    const recipe = {
      recipe_id: 0,
      user_id: 0,
      title: "PB & J",
      description: "Peanut butter and Jelly sandwich",
      instructions: "Take two equal sized pieces of bread.\nSpread Jelly on one piece of bread.\nSpread Peanut butter on the other piece of bread.\nStack the two pieces of bread so the the Peanut butter and jelly touch.\n",
      prep_time: 1,
      servings: 1,
      created_at: "21 Jan 2024 00:00:00 GMT",
      updated_at: "21 Jan 2024 00:00:00 GMT",
      img: "/pbj2.jpg"
    };
    render(<RecipeCard recipe={recipe} setCurrentRecipe={handler} />);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "200");
  });

  test("Uses custom size when provided", () => {
    const recipe = {
      recipe_id: 1,
      user_id: 0,
      title: "Dorm Monsieur",
      description: "Dormified version of the classic french Croque Monsieur",
      instructions: "Take two equal sized pieces of bread, preferably french baguette.\nIf possible, heat the bread in an oven or toaster.\nFirst, place gruyere Cheese on top of the warm bread.\nPlace slightly rolled slices of deli ham on top of the cheese to add texture and height to the sandwich.\nOptionally spread mustard on the second piece of bread.\nPlace second piece of bread on top to close the sandwich and serve.\n",
      prep_time: 2,
      servings: 1,
      created_at: "22 Jan 2024 00:00:00 GMT",
      updated_at: "22 Jan 2024 00:10:00 GMT",
      img: "/pbj.jpg"
    };
    render(<RecipeCard recipe={recipe} setCurrentRecipe={handler} size={300} />);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img).toHaveAttribute("width", "300");
    expect(img).toHaveAttribute("height", "300");
  });

  test("Displays the correct recipe title", () => {
    const recipe = {
      recipe_id: 2,
      user_id: 1,
      title: "Easy Vegetable Pasta",
      description: "Quick and healthy pasta for 5",
      instructions: "Bring a large pot of generously salted water to a boil.\nCook pasta (any shape works) according to the directions on the package.\nHeat a medium pan over medium high heat.\nOptionally, toast pine nuts in the pan. Set aside the pine nuts when they are a deep golder brown.\nHeat a tablespoon of olive oil in the same pan.\nAdd zucchini and mushrooms to the pan and saute until lightly browned then set aside.\nAdd salt and pepper to taste.\nAdd half a tablespoon of olive oil to the pan.\nAdd finely minced garlic, and cook until golden and fragrant.\nAdd tomatoes to the pan.\nReduce heat to medium heat, and cook until the tomatoes burst and a loose sauce starts to come together.\nIn a large bowl, combine the cooked pasta, vegetables, and sauce.\nSalt to taste, optionally stir in toasted pine nuts and parmesan cheese\n",
      prep_time: 30,
      servings: 5,
      created_at: "23 Jan 2024 00:00:00 GMT",
      updated_at: "23 Jan 2024 00:30:00 GMT"
    };
    render(<RecipeCard recipe={recipe} setCurrentRecipe={handler} />);

    expect(screen.getByText("Easy Vegetable Pasta")).toBeInTheDocument();
  });

  test("Uses fallback image if recipe.img is not provided", () => {
    const recipe = {
      "recipe_id": 3,
      user_id: 1,
      title: "Cinnamon Sugar Toast",
      description: "Quick snack good for breakfast or desert",
      instructions: "In a small bowl, combine two tablespoons of sugar and one tablespoon of cinnamon.\nToast a piece of bread. While it's still hot, spread with salted butter and sprinkle with the Cinnamon sugar mixture\n",
      prep_time: 2,
      servings: 1,
      created_at: "24 Jan 2024 10:00:00 GMT",
      updated_at: "25 Jan 2024 00:10:00 GMT"
    };
    render(<RecipeCard recipe={recipe} setCurrentRecipe={handler} />);

    const img = screen.getByAltText("Picture of the recipe");
    expect(img.src).toMatch("http://localhost/_next/image?url=%2Frecipe3.jpg&w=640&q=75");
  });

  test("Clicking the card calls setCurrentRecipe with recipe.recipe_id", () => {
    const recipe = {
      recipe_id: 4,
      user_id: 2,
      title: "Click Test",
      description: "Peanut butter and Honey sandwich",
      instructions: "Take two equal sized pieces of bread.\nSpread Honey on one piece of bread. Spread Peanut butter on the other piece of bread.\nStack the two pieces of bread so the the Peanut butter and honey touch.\nOptionally fry in a pan with butter till golden brown on both sides.\n",
      prep_time: 5,
      servings: 1,
      created_at: "25 Jan 2024 00:00:00 GMT",
      updated_at: "25 Jan 2024 00:00:00 GMT"
    };
    render(<RecipeCard recipe={recipe} setCurrentRecipe={handler} />);

    const card = screen.getByTestId("recipe");
    fireEvent.click(card);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(recipe.recipe_id);
  });
});