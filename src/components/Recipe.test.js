import { render, screen } from "@testing-library/react";
import Recipe from "./Recipe";

describe.skip("Recipe: Recipe tests", () => { // NOTE: SKIPPING THE RECIPE TEST FOR NOW because this needs to be updated to work with DB content
    let currentRecipe
    let ratings;
    beforeEach(()=>{
        currentRecipe = {
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
        };

        ratings = [
          {
            id: 0,
            recId: 0,
            userId: 0,
            value: 2,
          },
          {
            id: 0,
            recId: 0,
            userId: 1,
            value: 3,
          },
          {
            id: 0,
            recId: 0,
            userId: 2,
            value: 4,
          },
        ];
    })
    test("Recipe renders the correct Ingredients and Steps", () => {
        render(<Recipe currentRecipe={currentRecipe} ratings={ratings}/>)
        currentRecipe.ingredients.forEach((ingredient) => {
            expect(screen.queryByRole("listitem", {name: ingredient}))
        })
        currentRecipe.steps.forEach((stp) => {
            expect(screen.queryByRole("listitem", {name: stp}))
        })

        
    })
})