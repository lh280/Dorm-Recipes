/* 
  Rating.js

  Displays rating information for a given recipe.
*/

export default function Rating({ review }) {
  return (
    <div>
      <strong>Rating: {review.rating/2}</strong> {/* divide by 2 to get # stars */}
      <p>{review.content}</p>
      <p><small>{Date(review.created_at).toLocaleString()}</small></p>
    </div>
  );
}