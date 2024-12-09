/* 
  Recipe.js

  Displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RecipeShape from "./RecipeShape";
import ReviewEditor from "./ReviewEditor";
import Rating from "./Rating";

function parseInstructions(instructions) {
  const sentenceRegex = /([.])\s*/;

  // Split the paragraph by sentence-ending punctuation (., !, or ?) and retain the punctuation mark.
  const sentences = instructions.split(sentenceRegex)
          .filter(Boolean)  // Remove any empty strings that may appear
          .map((sentence, index, array) => {
            // Combine the sentence with its punctuation if it's not the last part
            if (index % 2 === 0) {
              return sentence.trim() + (array[index + 1] || '');
            }
            return null;
          })
          .filter(Boolean); // Filter out nulls
  return sentences;
}


export default function Recipe({ currentRecipe, setCurrentRecipe }) {
  const router = useRouter();
  if (!currentRecipe) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Box>
      );
  }
  const [reviews, setReviews] = useState(currentRecipe.recipe_reviews || []);
  const [userReview, setUserReview] = useState(
    currentRecipe.recipe_reviews.find(review => review.user_id === currentRecipe.user_id) || null
  );

  const handleReviewSubmitted = (newReview) => {
    setReviews((prevReviews) => {
      if (userReview) {
        return prevReviews.map((rev) =>
          rev.review_id === newReview.review_id ? newReview : rev
        );
      }
      return [newReview, ...prevReviews];
    });
    setUserReview(newReview);
    window.location.reload();
  };

  const editDate = new Date(currentRecipe.updated_at).toLocaleString();

  const steps = parseInstructions(currentRecipe.instructions).map((stp) => (
    <Typography key={stp} variant="body1" component="li" sx={{ marginBottom: 1 }}>
      {stp}
    </Typography>
  ));

  const combinedIngredients = currentRecipe.ingredients_used.map((ingredient) => {
    const recipeDetails = currentRecipe.recipe_ingredient.find((recIng) => recIng.ingredient_id === ingredient.ingredient_id);

    return {
      ingredient_name: ingredient.ingredient_name,
      ingredient_id: ingredient.ingredient_id,
      quantity: recipeDetails.quantity,
      unit: recipeDetails.unit,
    };
  });

  const handleReturn = (() => {
    router.back();
  })

  return ( 
    <Box sx={{ padding: 4 }}>
      <Button variant="outlined" onClick={handleReturn} sx={{ marginBottom: 2 }}>
        🔙 Back
      </Button>

      <Typography variant="h3" component="h1" gutterBottom>
        {currentRecipe.title}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 4 }}>
        <Image
          src={currentRecipe.img ? currentRecipe.img : "/food.jpg"}
          width={400}
          height={400}
          alt="Picture of the recipe"
          style={{ borderRadius: "8px", marginBottom: "16px" }}
        />

        <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
          {currentRecipe.description}
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontSize: "1.2rem", marginBottom: 1 }}>
          <span style={{ fontWeight: 'bold' }}>Prep time:</span> {currentRecipe.prep_time} minutes
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontSize: "1.2rem" }}>
          <span style={{ fontWeight: 'bold' }}>Servings:</span> {currentRecipe.servings}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      <ul style={{ paddingLeft: "20px" }}>
        {combinedIngredients.map((ing) => (
          <Typography
            key={ing.ingredient_id}
            variant="body1"
            component="li"
            sx={{ marginBottom: 1 }}
          >
            {ing.quantity} {ing.unit} of {ing.ingredient_name}
          </Typography>
        ))}
      </ul>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Instructions
      </Typography>
      <ul style={{ paddingLeft: "20px" }}>{steps}</ul>

      <Typography variant="caption" color="textSecondary" sx={{ display: "block", marginTop: 2 }}>
        Last edited: {editDate}
      </Typography>

      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {currentRecipe.recipe_reviews && currentRecipe.recipe_reviews.length > 0 ?(
          currentRecipe.recipe_reviews.map((rev) => (
            <Rating review={rev} setReviews={setReviews}></Rating>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No reviews for this recipe—be the first to leave a rating!
          </Typography>
        )}
      </Box>
      <ReviewEditor
        currentRecipe={currentRecipe}
        existingReview={userReview}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </Box>
  );
}

Recipe.propTypes = {
  currentRecipe: RecipeShape
};
