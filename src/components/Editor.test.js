// Editor.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "./Editor";

const mockComplete = jest.fn();

describe("Editor component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseRecipe = {
    recipe_id: 123,
    authorId: 999,
    title: "Example Recipe",
    description: "This is an example description",
    time: 15,
    servings: 2,
    instructions: "Step one\nStep two",
    ingredients: [
      { name: "Flour", quantity: 2, unit: "cups" },
      { name: "Eggs", quantity: 3, unit: "pcs" },
    ],
    image: "",
  };

  test("renders form fields correctly", () => {
    render(<Editor currentRecipe={baseRecipe} complete={mockComplete} />);
    expect(screen.getByLabelText(/Recipe Title\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preparation Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servings/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByText(/Cooking Steps/i)).toBeInTheDocument();
  });


  test("allows adding and removing ingredients", () => {
    const noIngredients = { ...baseRecipe, ingredients: [], instructions: "Step one\nStep two" };
    render(<Editor currentRecipe={noIngredients} complete={mockComplete} />);

    expect(screen.queryByPlaceholderText(/ingredient 1/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add ingredient/i }));
    expect(screen.getByPlaceholderText(/ingredient 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add ingredient/i }));
    const ingredientFields = screen.getAllByLabelText(/ingredient name/i);
    expect(ingredientFields).toHaveLength(2);

    const removeIcons = screen.getAllByTestId("RemoveCircleOutlineIcon");
    fireEvent.click(removeIcons[0].closest("button"));

    const remaining = screen.getAllByLabelText(/ingredient name/i);
    expect(remaining).toHaveLength(1);
  });

  test("allows adding and removing steps", () => {
    const noSteps = { ...baseRecipe, instructions: "" };
    render(<Editor currentRecipe={noSteps} complete={mockComplete} />);
  
    let stepFields = screen.getAllByPlaceholderText(/step/i);
    fireEvent.click(screen.getByRole("button", { name: /add step/i }));
    stepFields = screen.getAllByPlaceholderText(/step/i);
    expect(stepFields.length).toBe(2); // for example
  
    const removeIcons = screen.getAllByTestId("RemoveCircleOutlineIcon");
    fireEvent.click(removeIcons[0].closest("button"));
  
    stepFields = screen.getAllByPlaceholderText(/step/i);
    expect(stepFields.length).toBe(2); // e.g. if the code auto-reinserts a blank step
  });

  test("validates form fields on save", () => {
    const emptyRecipe = { 
      ...baseRecipe,
      title: "",
      description: "",
      time: "",
      servings: "",
      instructions: "",
      ingredients: [],
    };
    render(<Editor currentRecipe={emptyRecipe} complete={mockComplete} />);

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Preparation time must be greater than 0")).toBeInTheDocument();
    expect(screen.getByText("Servings must be greater than 0")).toBeInTheDocument();
    expect(screen.getByText("Each ingredient must have a name, quantity, and unit.")).toBeInTheDocument();
    expect(screen.getByText("At least one cooking step is required")).toBeInTheDocument();
    expect(mockComplete).not.toHaveBeenCalled();
  });


  test("clicking Cancel calls complete with no args", () => {
    render(<Editor currentRecipe={baseRecipe} complete={mockComplete} />);

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith();
  });
});