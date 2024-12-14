import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "./Editor";

describe("Editor: Editor tests", () => {
  let recipe;
  const handler = jest.fn();

  beforeEach(() => {
    recipe = {
      recipe_id: 0,
      img: "/pbj.jpg",
      title: "PB & J Sandwich",
      author: "Noah Price",
      time: 15,
      servings: 1,
      user_id: 0,
      description: "This is a description.",
      recipe_ingredient: [
        { ingredient_id: 1, quantity: 2, unit: "slices", ingredient_name: "Bread" },
        { ingredient_id: 2, quantity: 1, unit: "jar", ingredient_name: "Peanut Butter" },
        { ingredient_id: 3, quantity: 1, unit: "jar", ingredient_name: "Jelly" },
      ],
      recipe_reviews: [],
      // Editor uses "instructions" as an array or newline-delimited string
      instructions: "Apply the peanut butter... Close the sandwich.",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    handler.mockReset();
  });

  test.skip("Editor: editor is populated by the recipe data", () => {
    render(<Editor currentRecipe={{ ...recipe }} complete={handler} />);
    expect(screen.getByDisplayValue(recipe.title)).toBeVisible();
    expect(screen.getByDisplayValue(recipe.description)).toBeVisible();
    expect(screen.getByDisplayValue(String(recipe.time))).toBeVisible();
    const stepsTextarea = screen.getByPlaceholderText("Enter cooking steps (one per line)");
    const expectedInstructions = Array.isArray(recipe.instructions)
      ? recipe.instructions.join("\n")
      : recipe.instructions;
    expect(stepsTextarea.value.trim()).toBe(expectedInstructions.trim());
  });

  test("Editor: Props are not mutated", () => {
    const testRecipe = { ...recipe };
    const { container } = render(<Editor complete={handler} currentRecipe={testRecipe} />);
    const titleInput = container.querySelector("input[type=text]");
    const descriptionInput = container.querySelector("textarea");
    const saveButton = screen.getByRole("button", { name: "Save your recipe" });

    const newTitle = "New title";
    const newDescription = "New content";

    fireEvent.change(titleInput, { target: { value: newTitle } });
    fireEvent.change(descriptionInput, { target: { value: newDescription } });
    fireEvent.click(saveButton);

    expect(testRecipe).toEqual(recipe);
  });
});