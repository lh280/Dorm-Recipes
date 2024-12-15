import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Review from "./Review";

jest.mock("next-auth/react")

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(),
  }),
}));

describe("Review: Review tests", () => {
  const review = {
    review_id: 1,
    recipe_id: 0,
    id: 0,
    rating: 4,
    content: "This is a test review.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const setReviews = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  useSession.mockReturnValue({
    data: {
      user: { id: 0, email:["Gdwade@middlbury.edu"] },
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      
    },
    status: "authenticated",
    });

  test("Review shows the contents of the review", () => {
    render(<Review review={review} setReviews={setReviews} />);

    // Check if review content and date are displayed
    expect(screen.getByText(review.content)).toBeInTheDocument();
    expect(screen.getByText(new Date(review.updated_at).toLocaleString())).toBeInTheDocument();
  });

  test("Review renders the correct number of star icons", () => {
    render(<Review review={review} setReviews={setReviews} />);

    // Check if the correct number of stars is displayed
    const starsContainer = screen.getByTestId("star-icons") // I tried to do it the same way in recipe.test.js using getAllByTestId but it didn't work
    const starCount = starsContainer.children.length;
    const fullStars = Math.floor(review.rating / 2);
    const hasHalfStar = review.rating % 2 !== 0;
    const expectedStarCount = fullStars + (hasHalfStar ? 1 : 0) + (5 - fullStars - (hasHalfStar ? 1 : 0));
    expect(starCount).toBe(expectedStarCount);
     
  });

  test("Clicking delete button triggers the delete flow", () => {
    const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(true);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(),
    });

    render(<Review review={review} setReviews={setReviews} />);
    const deleteButton = screen.getByText("Delete Review");

    fireEvent.click(deleteButton);

    expect(confirmMock).toHaveBeenCalledWith("Are you sure you want to delete this review?");
    expect(global.fetch).toHaveBeenCalledWith(`/api/reviews/${review.review_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    confirmMock.mockRestore();
  });

  test("Clicking delete button and canceling does not call fetch", () => {
    const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(false);
    global.fetch = jest.fn();

    render(<Review review={review} setReviews={setReviews} />);
    const deleteButton = screen.getByText("Delete Review");

    fireEvent.click(deleteButton);

    expect(confirmMock).toHaveBeenCalledWith("Are you sure you want to delete this review?");
    expect(global.fetch).not.toHaveBeenCalled();

    confirmMock.mockRestore();
  });

  test("Error is logged when API call fails", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(true);
    global.fetch = jest.fn().mockRejectedValue(new Error("API Error"));

    render(<Review review={review} setReviews={setReviews} />);
    const deleteButton = screen.getByText("Delete Review");

    fireEvent.click(deleteButton);

    await screen.findByText("Delete Review");

    expect(consoleErrorMock).toHaveBeenCalledWith("Error deleting review:", expect.any(Error));

    consoleErrorMock.mockRestore();
    confirmMock.mockRestore();
  });
});