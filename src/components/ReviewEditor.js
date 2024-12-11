/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */

import { useState } from 'react';
import PropTypes from "prop-types";

import { TextField, Button, Typography, Box, Rating, Card, CardContent, useTheme, useMediaQuery } from '@mui/material';

import RecipeShape from './RecipeShape';
import ReviewShape from './ReviewShape';

export default function ReviewEditor({ currentRecipe, existingReview, onReviewSubmitted }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [reviewContent, setReviewContent] = useState(existingReview?.content || '');
  const [reviewRating, setReviewRating] = useState(existingReview?.rating || 0);
  const [fieldErrors, setFieldErrors] = useState({
    content: false,
    rating: false,
  });

  const handleReviewChange = (e) => {
    const { value } = e.target;
    setReviewContent(value);
  };

  const handleRatingChange = (e) => {
    const { value } = e.target;
    const strictValue = isMobile ? Math.min(10, Math.max(1, value)) : Math.min(5, Math.max(1, value)); // Keeps value between 1-5 on mobile, 1-10 on pc
    setReviewRating(strictValue);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    let hasErrors = false;
    const errors = {
      content: false,
      rating: false,
    };

    if (!reviewContent) {
      errors.content = true;
      hasErrors = true;
    }

    if (reviewRating === 0) {
      errors.rating = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(errors);
      return;
    }

    const normalizedRating = isMobile ? reviewRating : reviewRating * 2;

    const reviewData = {
      recipe_id: currentRecipe.recipe_id,
      user_id: currentRecipe.user_id,
      content: reviewContent,
      rating: normalizedRating,
    };

    const url = existingReview
      ? `/api/reviews/${existingReview.review_id}` // Update the existing review (PUT request)
      : `/api/reviews`; // Create a new review (POST request)

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
      setReviewRating(0); // 0 to begin, but once the user touches it the value can only be 1-10
      onReviewSubmitted(data);
    } catch (error) {
      console.error('Error submitting review:', error); // eslint-disable-line
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" p={2}>
      <Card sx={{ width: 400, boxShadow: 3, padding: 1 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {existingReview ? 'Edit Your Review' : 'Write a Review'}
          </Typography>
          <form onSubmit={handleReviewSubmit}>
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Box display="flex" justifyContent={ isMobile ? "center" : "left"} sx={{ mb: 2 }}>
                {isMobile ? (
                <Rating
                  value={reviewRating}
                  onChange={handleRatingChange}
                  precision={1}
                  max={10}
                  size="medium"
                />)
                : (
                <Rating
                  name="half-rating"
                  value={reviewRating}
                  onChange={handleRatingChange}
                  precision={0.5}
                  max={5}
                  size="large"
                />)}
              </Box>
                {fieldErrors.rating && (
                  <Typography color="error" variant="body2">
                    Please provide a rating.
                  </Typography>
                )}
              <Box>
                <TextField
                  id="content"
                  name="content"
                  label="Review Content"
                  value={reviewContent}
                  onChange={handleReviewChange}
                  placeholder="Write your review here..."
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                />
                {fieldErrors.content && (
                  <Typography color="error" variant="body2">
                    Please fill out the review content.
                  </Typography>
                )}
              </Box>
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                {existingReview ? 'Update Review' : 'Submit Review'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

ReviewEditor.propTypes = {
  currentRecipe: RecipeShape, 
  existingReview: ReviewShape, 
  onReviewSubmitted: PropTypes.func.isRequired,
  review: ReviewShape,
  setReviews: PropTypes.func.isRequired
};