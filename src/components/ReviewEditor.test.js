import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import ReviewEditor from "./ReviewEditor";

global.fetch = jest.fn();

describe("ReviewEditor Component", () => {
  const mockOnReviewSubmitted = jest.fn();
  const mockSetReviews = jest.fn();
  const mockSession = {
    user: { id: 10, name: "Mock User" },
    expires: "2099-01-01T00:00:00Z",
  };

  // Provide instructions herec
  const baseRecipe = {
    recipe_id: 42,
    user_id: 10,
    description: "Test Description",
    instructions: "Mock instructions here",  // REQUIRED
    title: "Test Recipe",
  };

  function renderWithSession(ui) {
    return render(
      <SessionProvider session={mockSession}>
        {ui}
      </SessionProvider>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows error if user tries to submit with empty content", async () => {
    renderWithSession(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // For final rating=2, pick "1" (1 * 2=2)
    fireEvent.click(screen.getByDisplayValue("1"));
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    expect(screen.getByText("Please fill out the review content.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });

  test("shows error if user tries to submit with rating=0", async () => {
    renderWithSession(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "Yummy!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    expect(screen.getByText("Please provide a rating.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });

  test("submits new review (POST) on valid input", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ review_id: 999, rating: 9, content: "Delicious!" }),
    });

    renderWithSession(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // For final rating=9 => pick "4.5"
    fireEvent.click(screen.getByDisplayValue("4.5"));
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "Delicious!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch.mock.calls[0][0]).toBe("/api/reviews");
    
    const fetchOptions = fetch.mock.calls[0][1];
    const body = JSON.parse(fetchOptions.body);
    expect(body.recipe_id).toBe(baseRecipe.recipe_id);
    expect(body.id).toBe(mockSession.user.id);
    expect(body.content).toBe("Delicious!");
    expect(body.rating).toBe(9);

    await waitFor(() => {
      expect(mockOnReviewSubmitted).toHaveBeenCalledTimes(1);
      expect(mockOnReviewSubmitted).toHaveBeenCalledWith({
        review_id: 999,
        rating: 9,
        content: "Delicious!",
      });
    });
  });

  test("updates existing review (PUT) on valid input", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ review_id: 1, rating: 10, content: "Even better updated!" }),
    });
    const existingReview = {
      review_id: 1,
      id: 10,  // to match session.user.id
      content: "Old content",
      rating: 8,
      updated_at: new Date().toISOString(),
    };

    renderWithSession(
      <ReviewEditor
        currentRecipe={baseRecipe}
        existingReview={existingReview}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // For final rating=10 => pick "5"
    fireEvent.click(screen.getByDisplayValue("5"));
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "Even better updated!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update review/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toBe("/api/reviews/1");
    });

    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.review_id).toBe(1);
    expect(body.content).toBe("Even better updated!");
    expect(body.rating).toBe(10);

    await waitFor(() => {
      expect(mockOnReviewSubmitted).toHaveBeenCalledTimes(1);
      expect(mockOnReviewSubmitted).toHaveBeenCalledWith({
        review_id: 1,
        rating: 10,
        content: "Even better updated!",
      });
    });
  });

  test("handles fetch error gracefully", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    renderWithSession(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // If we want final rating=9 => "4.5"
    fireEvent.click(screen.getByDisplayValue("4.5"));
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "A middle-ground review" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    // Because ok:false => onReviewSubmitted is NOT called
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });
});