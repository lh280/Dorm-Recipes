import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "./Editor";

describe.skip("Editor: Editor tests", () => { // NOTE: Skipping the Editor test for now because this needs to be updated to work with DB content
    let recipe;
    const handler = jest.fn();
  
    beforeEach(() => {
      recipe = {
        id: 42,
        authorId: 2,
        title: "Title of sample recipe",
        description: "Sample recipe for testing",
        time: 2,
        ingredients: ["egg", "milk", "flour", "baking soda", "sugar"],
        steps: ["Step one of sample recipe", "step two of sample recipe", "all done!"],
        edited: new Date("2020-06-10T14:54:40Z").toISOString(),
      };
  
      handler.mockReset();
    });

    test("Editor: editor is populated by article", () => {
        render(<Editor currentRecipe={ {...recipe} } complete={handler} />);
        expect(screen.getByDisplayValue(recipe.title)).toBeVisible();
        expect(screen.getByDisplayValue(recipe.description)).toBeVisible();
        expect(screen.getByDisplayValue(String(recipe.time))).toBeVisible();
        expect(screen.getByDisplayValue(recipe.ingredients.join(", "))).toBeVisible();
        
        const stepsTextarea = screen.getByPlaceholderText("Enter cooking steps (one per line)");
        expect(stepsTextarea.value.trim()).toBe(recipe.steps.join("\n").trim());
      });

      test("Editor: Props are not mutated", () => {
        const testRecipe = { ...recipe };
        const { container } = render(
          <Editor complete={handler} currentRecipe={testRecipe} />,
        );
        const newTitle = "New title";
        const newBody = "New content";
    
        const titleInput = container.querySelector("input[type=text]");
        const descriptionInput = container.querySelector("textarea");
        const saveButton = screen.getByRole("button", { name: "Save" });
    
        fireEvent.change(titleInput, { target: { value: newTitle } });
        fireEvent.change(descriptionInput, { target: { value: newBody } });
    
        fireEvent.click(saveButton);
    
        expect(testRecipe).toEqual(recipe);
      });
})