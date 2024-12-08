import { render,screen } from "@testing-library/react";
import Rating from "./Rating";

describe.skip("Rating: Rating tests", ()=>{
    const handler = jest.fn();
    let ratings;
    let currentRecipe;
    beforeEach(()=>{
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
            }
        ];
     
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
        } 

        handler.mockReset();
    })
    test("Rating is populated by props passed in", ()=>{
        render(<Rating ratings={ratings} currentRecipe={currentRecipe}/>) // TODO: Account for user id
        const avgRating = ratings.reduce((total,rating)=> total + rating.value,0)/ratings.length
        const userRating = ratings.find((element) => element.userId === 0).value; // TODO: Account for user id
        expect(screen.getByText(`User Rating: ${userRating}`))
        expect(screen.getByText(`Average Rating: ${avgRating}`)) // TODO: Do the actual calculation here, rather than hard coding. 
    })
})