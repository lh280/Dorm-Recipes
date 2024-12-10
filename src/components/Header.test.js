import {render} from "@testing-library/react"
import Header from "./Header"

describe("Header: Testing header funtionality",() => {
    const handler = jest.fn();
    const currentUser = {user_id:0,email:"test@gmail.com",created_at:"21 Jan 2024 00:00:00 GMT"}
     beforeEach(() => {
    handler.mockReset();
  });
    test("Header renders both the Site name and a user Icon", () => {
        const {getByText} = render(<Header setCurrentRecipe={handler} currentUser={currentUser} viewAccount={handler}/>)
        expect(getByText("Dorm Recipes")).toBeVisible();
        expect(getByText(currentUser.user_id)).toBeVisible();
    })
})