import { render, screen } from "@testing-library/react";
import Section from "./Section";


jest.mock("next-auth/react");


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
        render(<Section title="Test Section" recipes = {recipes} openRecipe={handler}/>);
        recipes.forEach((rec) => {
            expect(screen.queryByRole("heading", {name : rec.title})).toBeInTheDocument()
        })
    })
})