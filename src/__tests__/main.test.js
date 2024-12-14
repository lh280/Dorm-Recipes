import { render } from "@testing-library/react";
import Home from "@/pages/index";
import { useRouter } from "next/router";
import { useSession, SessionProvider } from "next-auth/react";

jest.mock("next-auth/react");

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
    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
      });
    render(<SessionProvider><Home setCurrentRecipe={()=>{}} currentUser={currentUser}/></SessionProvider>);
  });
});

