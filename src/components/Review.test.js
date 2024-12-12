import { render,screen } from "@testing-library/react";
import Review from "./Review";
import { useRouter } from "next/router";

<<<<<<< HEAD
describe("Review: Review tests", ()=>{
=======
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("Review: Review tests", ()=>{  // TODO: Account for authorization
>>>>>>> b73848d04788ba3ce0896fb55bebeb776051daf8
    const handler = jest.fn();
    const review = 
    {
      review_id: 0,
      recipe_id: 0,
      user_id: 0,
      rating: 6,
      content: "this is a test review",
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    };
const setReviews = jest.fn();
    beforeEach(()=>{
        handler.mockReset();
    })
    test("Review shows the contents of the review", ()=>{
        render(<Review review={review} setReviews={setReviews}/>)
        expect(screen.getByText(`${review.content}`)).toBeInTheDocument();
        expect(screen.getByText(`${review.updated_at}`)).toBeInTheDocument();
    })
})