import { render, screen } from "@testing-library/react";
import RecipesView from "./RecipesView";

describe("RecipesView: RecipesView tests",()=>{
    const handler = jest.fn();
    let recipes;
    beforeEach(() => {
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
    })
    test("RecipesView displays the correct information", ()=>{
        render(<RecipesView recipes={recipes} setCurrentRecipe={handler}/>)
        recipes.forEach((rec) => {
            expect(screen.queryByRole("paragraph", {name: rec.id}))
            expect(screen.queryByRole("paragraph", {name: rec.rating}))
            expect(screen.queryByRole("paragraph", {name: rec.title}))
            expect(screen.queryByRole("paragraph", {name: rec.time}))
        })
        
    })
})