// Header.test.js

import { render, screen } from "@testing-library/react";
import Header from "./Header";

// 1) Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header: Testing header funtionality", () => {
  const handler = jest.fn();
  const currentUser = { user_id: 0, email: "test@gmail.com", created_at: "21 Jan 2024 00:00:00 GMT" };

  beforeEach(() => {
    handler.mockReset();
    // 2) Provide a mock implementation for useRouter in each test
    const { useRouter } = jest.requireActual("next/router");
    useRouter.mockReturnValue({
      push: jest.fn(),     // mock any router methods you use, e.g. push(), route, query, etc.
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
    });
  });

  test.skip("Header renders both the Site name and a user Icon", () => {
    render(<Header setCurrentRecipe={handler} currentUser={currentUser} viewAccount={handler} />);

    expect(screen.getByText("Dorm Recipes")).toBeVisible();
    // The Avatar text is the user_id rendered as a child, so:
    expect(screen.getByText(currentUser.user_id)).toBeVisible();
  });
});