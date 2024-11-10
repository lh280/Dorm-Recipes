import { render } from "@testing-library/react";
import Home from "@/pages/index";
import { useRouter } from "next/router";

// Mock useRouter from Next.js
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("End-to-end testing", () => {
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
    render(<Home setCurrentRecipe={()=>{}}/>);
  });
});

