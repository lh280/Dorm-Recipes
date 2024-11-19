import { render } from "@testing-library/react";
import Home from "@/pages/index";
import { useRouter } from "next/router";

// Mock useRouter from Next.js
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("End-to-end testing", () => {
  const currentUser = {user_id:0,email:"test@gmail.com",created_at:"21 Jan 2024 00:00:00 GMT"}
  beforeEach(() => {
    
    useRouter.mockReturnValue({
      push: jest.fn(),
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
    });
  });

  test("Render index.js component", () => {
    render(<Home setCurrentRecipe={()=>{}} currentUser={currentUser}/>);
  });
});

