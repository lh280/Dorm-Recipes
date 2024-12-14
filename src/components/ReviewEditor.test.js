// ReviewEditor.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSession} from "next-auth/react";
import ReviewEditor from "./ReviewEditor";


global.fetch = jest.fn();
jest.mock("next-auth/react")

describe("ReviewEditor Component", () => {
  const mockOnReviewSubmitted = jest.fn();

  // Provide all the required props to avoid warnings:
  const baseRecipe = {
    recipe_id: 42,
    user_id: 10,
    description: "Test Description", // needed because it's marked as required in propTypes
    title: "Test Recipe",
    // any other required fields can go here
  };

  // We'll define a no-op setReviews to satisfy the `.isRequired` prop
  const mockSetReviews = jest.fn();
  useSession.mockReturnValue({
      data: {
        user: { id: 1, email:["Gdwade@middlbury.edu"] },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        
      },
      status: "authenticated",
      });
      
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows error if user tries to submit with empty content", async () => {
    // Pass `setReviews` and the required `description` field
    render(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // rating must be > 0, so pick "5 Stars"
    fireEvent.click(screen.getByLabelText("5 Stars"));

    // content is empty => trigger error
    fireEvent.click(screen.getByRole("button", { name: "Submit Review" }));

    expect(screen.getByText("Please fill out the review content.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });

  test("shows error if user tries to submit with rating = 0", async () => {
    render(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // type some content
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "Yummy!" },
    });
    // rating is 0 => trigger error
    fireEvent.click(screen.getByRole("button", { name: "Submit Review" }));

    expect(screen.getByText("Please provide a rating.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });

  test("submits new review (POST) on valid input", async () => {
    // Mock a successful POST response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ review_id: 999, rating: 9, content: "Delicious!" }),
    });

    render(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // Choose "9 Stars"
    fireEvent.click(screen.getByLabelText("9 Stars"));
    // Provide some content
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "Delicious!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Review" }));

    // Wait for the async fetch and React state updates
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toBe("/api/reviews");
    });

    const fetchOptions = fetch.mock.calls[0][1];
    expect(fetchOptions.method).toBe("POST");

    const body = JSON.parse(fetchOptions.body);
    expect(body.recipe_id).toBe(baseRecipe.recipe_id);
    expect(body.user_id).toBe(baseRecipe.user_id);
    expect(body.content).toBe("Delicious!");
    expect(body.rating).toBe(9);

    // Also wait for onReviewSubmitted to be called
    await waitFor(() => {
      expect(mockOnReviewSubmitted).toHaveBeenCalledTimes(1);
      expect(mockOnReviewSubmitted).toHaveBeenCalledWith({
        review_id: 999,
        rating: 9,
        content: "Delicious!",
      });
    });

    // fields reset after submission
    expect(screen.getByLabelText("Review Content")).toHaveValue("");
    // The rating visually resets, but you can’t easily assert that programmatically
  });

  test("updates existing review (PUT) on valid input", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ review_id: 1, rating: 10, content: "Even better updated!" }),
    });
    // Provide all required fields, including updated_at
    const existingReview = {
      review_id: 1,
      recipe_id: baseRecipe.recipe_id,
      user_id: baseRecipe.user_id,
      content: "Old content",
      rating: 8,
      updated_at: new Date().toISOString(), // needed if it's required
    };

    render(
      <ReviewEditor
        currentRecipe={baseRecipe}
        existingReview={existingReview}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // Choose "10 Stars"
    fireEvent.click(screen.getByLabelText("10 Stars"));

    // Update content
    const contentEl = screen.getByLabelText("Review Content");
    fireEvent.change(contentEl, { target: { value: "Even better updated!" } });

    fireEvent.click(screen.getByRole("button", { name: "Update Review" }));

    // Wait for async updates
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toBe("/api/reviews/1");
    });
    const fetchOptions = fetch.mock.calls[0][1];
    expect(fetchOptions.method).toBe("PUT");

    const body = JSON.parse(fetchOptions.body);
    expect(body.review_id).toBe(1);
    expect(body.content).toBe("Even better updated!");
    expect(body.rating).toBe(10);

    // Also check that onReviewSubmitted was called
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

    render(
      <ReviewEditor
        currentRecipe={baseRecipe}
        setReviews={mockSetReviews}
        onReviewSubmitted={mockOnReviewSubmitted}
      />
    );

    // Choose "5 Stars"
    fireEvent.click(screen.getByLabelText("5 Stars"));
    fireEvent.change(screen.getByLabelText("Review Content"), {
      target: { value: "A middle-ground review" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit Review" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    // The test won't fail, but onReviewSubmitted won't be called
    expect(mockOnReviewSubmitted).not.toHaveBeenCalled();
  });
});