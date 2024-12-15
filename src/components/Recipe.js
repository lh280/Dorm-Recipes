/* 
  Recipe.js

  Displays the contents of a recipe.

  props:
    currentRecipe - The recipe to render
*/
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */ // TODO: delete - TEMPORARY for CurrentUser
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material"
import Image from "next/image";
import RecipeShape from "./RecipeShape";
import ReviewEditor from "./ReviewEditor";
import Review from "./Review";

import getStarIcons from '../lib/getStarIcons';

function parseInstructions(instructions) {
  // Split the paragraph by newlines and trim each resulting string
  return instructions
    .split('\n')
    .map(sentence => sentence.trim()) // Remove leading and trailing spaces from each line
    .filter(Boolean); // Remove empty strings from the result
}


export default function Recipe({ currentRecipe, setCurrentRecipe }) {
  useEffect(() => {
    const url = new URL(window.location.href);

    // Check if the 'reloaded' query parameter exists
    if (!url.searchParams.has("reloaded")) {
      url.searchParams.set("reloaded", "true");
      window.location.replace(url.toString());
    }
  }, []);

  const { data: session, status } = useSession();
  const deleteButton = session && currentRecipe && (session.user.id === currentRecipe.id);
  const disabled = status !== "authenticated";
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [ratingData, setRatingData] = useState({ averageRating: 0, reviewCount: 0 });

  const imgLinks = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDR5k6f14Em_mZ20WnXBTkryMTyBNUgmKGHEvWfEnzYCy8C-h0",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRRffb4EBMFI__Cgw0YvIb1oB9tyVO5uJstECGV2ShVKydx9Kb9",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCGdEfcCk4xBvTacxKVJHJRqSkwsADTwkHq4ZqOapMj_04493f",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkagiJeupK0d9jhY-a4TJ9ckbGuQn82ZrQVhDvJXuqTN_T4bCD",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRQh6dIfgq31_P4KDXZfWbptrcntsSUyc7PO1vj0xV6UAl-vFYz",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Dcf5qwbC2uBdw3DUgPcLwfhBIZWrwxZYcDPtwKpEB-xWLlpn",
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTstHVxU0vWrplZ-QT1IgORpzQvapdNtROhkHox4gQzjalFk1ga",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQubA6CQT1eYhlR556vsLodlBo2vmwvTGkzZxNAo3sGCG57xels",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTLiN0v53zGtD0QB9UbctOINB6zHJtmAi85-2liN_XzAQSMYu-s",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXeoC2VrGfaW7x6Jw4I09q93zaxkjmV4K05-Fwt_RoFqfbdRzD"
  ];

  const img = (currentRecipe && currentRecipe.recipe_id <= 9) ? imgLinks[currentRecipe.recipe_id] : "/food1.jpg";

  useEffect(() => {
    if (currentRecipe) {
      setReviews(currentRecipe.recipe_reviews || []);
      const totalReviews = currentRecipe.recipe_reviews.length;
      const totalScore = currentRecipe.recipe_reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalScore / totalReviews;
      setRatingData({
        averageRating: averageRating.toFixed(1),
        reviewCount: totalReviews,
      });
      const userRev = currentRecipe.recipe_reviews.find(
        (review) => review.id === session?.user.id
      );
      setUserReview(userRev || null);
    }
  }, [currentRecipe, session?.user.id]);

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

  const handleReturn = () => {
    router.push("/");
  };

  if (!currentRecipe) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Box>
    );
  }
  const editDate = currentRecipe
    ? new Date(currentRecipe.updated_at).toLocaleString()
    : "";

  const steps = parseInstructions(currentRecipe.instructions).map((stp) => (
    <Typography key={stp} variant="body1" component="li" sx={{ marginBottom: 1 }}>
      {stp}
    </Typography>
  ));

  const combinedIngredients =
    currentRecipe &&
    currentRecipe.ingredients_used.map((ingredient) => {
      const recipeDetails = currentRecipe.recipe_ingredient.find(
        (recIng) => recIng.ingredient_id === ingredient.ingredient_id
      );

      return {
        ingredient_name: ingredient.ingredient_name,
        ingredient_id: ingredient.ingredient_id,
        quantity: recipeDetails.quantity,
        unit: recipeDetails.unit,
      };
    });

  const toHome = "\u2B05 to home";

  return (
    <Box sx={{ padding: 4 }}>
      <Box displayPrint="none">
        <Button variant="contained" onClick={handleReturn} sx={{ marginBottom: 2, bgcolor: '#201f54' }}>
          {toHome}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: 2,
        }}>
        <Typography variant={isMobile ? "h4" : "h3"}
          component="h1"
          gutterBottom
          sx={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? 1 : 0
          }}>
          {currentRecipe.title}
        </Typography>

        {ratingData.averageRating > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              marginLeft: isMobile ? 0 : 2
            }}
            displayPrint="none"
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {getStarIcons(ratingData.averageRating, isMobile ? "1.5rem" : "2rem")}
            </Box>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              ({ratingData.reviewCount})
            </Typography>
          </Box>
        ) : (
          <Box displayPrint="none">
            <Typography variant="body2" sx={{ marginLeft: isMobile ? 0 : 4, textAlign: isMobile ? "center" : "left" }}>
              No reviews yet
            </Typography>
          </Box>

        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 4 }}>
        <Box sx={{ marginBottom: 4, marginLeft: isMobile ? 0 : 3 }}>
          <Image
            src={img} // CHANGE IF IMG HANDLING IS UPDATED
            width={isMobile ? 300 : 400}
            height={isMobile ? 300 : 400}
            alt="Picture of the recipe"
            style={{ objectFit: "cover", borderRadius: "8px", marginBottom: "16px" }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 4 }} displayPrint="none">
          <Button variant="contained" onClick={() => { window.print() }} sx={{ bgcolor: '#201f54' }} >Print</Button>
        </Box>

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
            {Math.trunc(ing.quantity)} {ing.unit} of {ing.ingredient_name}
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

      <Box sx={{ marginTop: 6 }} displayPrint="none">
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        {
          reviews && reviews.length > 0 ? (
            reviews.map((rev) => (
              <Box key={rev.review_id} sx={{ mb: 3 }}>
                <Review review={rev} setReviews={setReviews} currentRecipe={currentRecipe} />
              </Box>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No reviews for this recipe—be the first to leave a rating!
            </Typography>
          )
        }

      </Box >
      <ReviewEditor
        currentRecipe={currentRecipe}
        existingReview={userReview}
        onReviewSubmitted={handleReviewSubmitted}
        disabled={disabled}
      />
    </Box >
  );
}

Recipe.propTypes = {
  currentRecipe: RecipeShape,
  setCurrentRecipe: PropTypes.func.isRequired,
};
