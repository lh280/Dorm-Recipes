/* 
  Rating.js

  Displays rating information for a given recipe.
*/
import Typography from "@mui/material/Typography";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; //eslint-disable-line
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function getStarIcons(rating) {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 !== 0;
  const totalStars = 5; 

  return (
    <>
      {Array.from({ length: totalStars }, (s, index) => {
        if (index < fullStars) {
          return <FaStar key={s} style={{ color: "gold" }} />;
        }
        if (index === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={s} style={{ color: "gold" }} />;
        }
        return <FaRegStar key={s} style={{ color: "gold" }} />;
      })}
    </>
  );
}


export default function Rating({ review, setReviews }) {
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
  return (
  <div>
    <Box key={review.review_id} sx={{ marginBottom: 3 }}>
      <Typography variant="body1">
      <strong>Rating:</strong> {getStarIcons(review.rating)}
        <p>{review.content}</p>
        <p><small>{new Date(review.created_at).toLocaleString()}</small></p>
      </Typography>
    </Box>
      <Button variant="contained" onClick={() => handleDelete(review)} sx={{ padding: '10px 20px' }}>
        Delete Rating
      </Button>
  </div>
  );
}