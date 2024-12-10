import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section: Testing sections", () => {
    let recipes;
    const handler = jest.fn();
    beforeEach(()=>{
       recipes = [{
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
        },{
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
        }]
        handler.mockReset();
    });

    test("All Recipes in the section render with correct title", ()=>{
        render(<Section title="Test Section" recipes = {recipes} openRecipe={handler}/>)
        recipes.forEach((rec) => {
            expect(screen.queryByRole("heading", {name : rec.title})).toBeInTheDocument()
        })
    })
    test("Renders the correct number of recipes", () => {
      render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
      const recipeCards = screen.getAllByRole("button");
      expect(recipeCards.length).toBe(recipes.length);
  });
  test("Each card displays the correct content", () => {
    render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
    recipes.forEach((rec) => {
        expect(screen.getByRole("heading", { name: rec.title })).toBeInTheDocument();
        expect(screen.getByAltText(`Image of ${rec.title}`)).toBeInTheDocument();
    });
});
test("Displays no recipes when the recipes list is empty", () => {
  render(<Section title="Test Section" recipes={[]} openRecipe={handler} />);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
test("Displays the correct section title", () => {
  const title = "Test Section";
  render(<Section title={title} recipes={recipes} openRecipe={handler} />);
  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
});
test("Matches snapshot", () => {
  const { container } = render(<Section title="Test Section" recipes={recipes} openRecipe={handler} />);
  expect(container).toMatchSnapshot();
});
test("Handles a long list of recipes", () => {
  const longRecipes = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      img: "/long-test.jpg",
      title: `Recipe ${index}`,
      author: "Test Author",
      time: "10 minutes",
      rating: "5 stars",
      ingredients: [],
      steps: [],
      edited: "2024-11-02",
  }));
  render(<Section title="Long Test Section" recipes={longRecipes} openRecipe={handler} />);
  longRecipes.forEach((rec) => {
      expect(screen.getByRole("heading", { name: rec.title })).toBeInTheDocument();
  });
  expect(screen.getAllByRole("button").length).toBe(50);
});

})