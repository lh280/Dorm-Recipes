import { useState, useEffect } from 'react';

export default function ReviewEditor({ currentRecipe, existingReview }) {
  const [reviewContent, setReviewContent] = useState(existingReview?.content || '');
  const [reviewRating, setReviewRating] = useState(existingReview?.rating || 0);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    if (name === "content") {
      setReviewContent(value);
    }
    if (name === "rating") {
      setReviewRating(Number(value));
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const reviewData = {
      recipe_id: currentRecipe.recipe_id,
      user_id: currentRecipe.user_id,
      content: reviewContent,
      rating: reviewRating,
    };

    const url = existingReview
      ? `/api/reviews` // Update the existing review (PUT request)
      : `/api/reviews/`; // Create a new review (POST request)

    const method = existingReview ? "PUT" : "POST"; 
    const body = JSON.stringify({
      ...(existingReview ? { review_id: existingReview.review_id } : {}),
      ...reviewData,
    });

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();

      // Reset the form
      setReviewContent('');
      setReviewRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h3>{existingReview ? "Edit Your Review" : "Write a Review"}</h3>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label htmlFor="rating">Rating (1-10): </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={reviewRating}
            min="1"
            max="10"
            onChange={handleReviewChange}
          />
        </div>
        <div>
          <label htmlFor="content">Review Content: </label>
          <textarea
            id="content"
            name="content"
            value={reviewContent}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            required
          />
        </div>
        <button type="submit">{existingReview ? "Update Review" : "Submit Review"}</button>
      </form>
    </div>
  );
}
