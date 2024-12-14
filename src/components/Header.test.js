import { render } from "@testing-library/react"
import { useRouter } from "next/router";
import { useSession} from "next-auth/react";
import Header from "./Header";

jest.mock("next-auth/react")

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header: Testing header funtionality",() => {
    const handler = jest.fn();

    beforeEach(() => {
      handler.mockReset();
      useRouter.mockImplementation(() => ({
        push: jest.fn(),
        pathname: "/",
        query: {},
        asPath: "/",
      }));
  });

  useSession.mockReturnValue({
      data: {
        user: { id: 1, email:["Gdwade@middlbury.edu"] },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        
      },
      status: "authenticated",
      });

    test("Header renders the site name", () => {
        const {getByText} = render(<Header setCurrentRecipe={handler} viewAccount={handler}/>)
        expect(getByText("Dorm Recipes")).toBeVisible();
    })
})