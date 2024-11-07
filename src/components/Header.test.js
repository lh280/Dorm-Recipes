import {render} from "@testing-library/react"
import Header from "./Header"

describe("Header: Testing header funtionality",() => {
    const handler = jest.fn();
    const currentUser = "Z"
     beforeEach(() => {
    handler.mockReset();
  });
    test("Header renders both the Site name and a user Icon", () => {
        const {getByText} = render(<Header setCurrentRecipe={handler} currentUser={currentUser}/>)
        expect(getByText("Dorm Recipes")).toBeVisible();
        expect(getByText(currentUser)).toBeVisible();
    })
})