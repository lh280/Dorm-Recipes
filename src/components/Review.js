/* 
  Review.js

  Displays rating information for a given recipe.
*/

/* eslint-disable react/prop-types */
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Typography, Button, Tooltip } from "@mui/material"
import ReviewShape from './ReviewShape';
import getStarIcons from '../lib/getStarIcons';


export default function Review({ review, setReviews, disabled }) {
  const router = useRouter();
  
  const handleDelete = (rev) => { // TODO: integrate authorization with delete handling
    // eslint-disable-next-line no-restricted-globals 
    const result = confirm("Are you sure you want to delete this review?"); // eslint-disable-line no-alert
    const id = rev.review_id;
    if (result && id) {
      fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete review");
          return response.json();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error deleting review:", error);
        });
      window.location.reload();
    }
    else if (!id) {
      // eslint-disable-next-line no-alert
      alert("No such review found: returning to homepage");
      router.back(); // Go back if no id found
    }
    setReviews();
  };

  const msg = disabled ? "Reviews can only be deleted by the publishing user" : "";

  return (
    <div>
      <Box key={review.review_id} sx={{ marginBottom: 3 }}>
        <Typography variant="body1">
          <strong>Rating:</strong> {getStarIcons(review.rating)}
          <p>{review.content}</p>
          <p><small>{new Date(review.updated_at).toLocaleString()}</small></p>
        </Typography>
      </Box>
      <Tooltip title={msg} slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [220, -35],
              },
            },
          ],
        },
      }}>
        <span>
          <Button
            variant="contained"
            onClick={() => handleDelete(review)}
            sx={{ padding: '5px 10px', fontSize: '0.75rem', bgcolor: '#201f54' }}
            disabled={disabled}
          >
            Delete Review
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}

Review.propTypes = {
  review: ReviewShape,
  setReviews: PropTypes.func.isRequired
};