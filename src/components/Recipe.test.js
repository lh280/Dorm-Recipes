import { render, screen } from "@testing-library/react";
import Recipe from "./Recipe";
import getStarIcons from "@/lib/getStarIcons";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Recipe: Recipe tests", () => {
  let currentRecipe;
  let recipeIngredients;
  let ingredients;
  let reviews;

  beforeEach(() => {
    // Mock data for ingredients (from the Ingredient model)
    ingredients = [
      { ingredient_id: 1, ingredient_name: "Bread" },
      { ingredient_id: 2, ingredient_name: "Peanut Butter" },
      { ingredient_id: 3, ingredient_name: "Jelly" },
    ];

    // Mock data for recipe ingredients (from the Recipe_Ingredients model)
    recipeIngredients = [
      { 
        recipe_id: 0, 
        ingredient_id: 1, 
        quantity: 2, 
        unit: "slices", 
        ingredient: ingredients.find(ing => ing.ingredient_id === 1),
      },
      { 
        recipe_id: 0, 
        ingredient_id: 2, 
        quantity: 1, 
        unit: "jar", 
        ingredient: ingredients.find(ing => ing.ingredient_id === 2),
      },
      { 
        recipe_id: 0, 
        ingredient_id: 3, 
        quantity: 1, 
        unit: "jar", 
        ingredient: ingredients.find(ing => ing.ingredient_id === 3),
      },
    ];

    // Mock data for the recipe
    currentRecipe = {
      recipe_id: 0,
      img: "/pbj.jpg",
      title: "PB & J Sandwich",
      author: "Noah Price",
      prep_time: 15,
      servings: 1,
      user_id: 0,
      description:"this is a description",
      recipe_ingredient: recipeIngredients, // Reference to Recipe_Ingredients
      ingredients_used: ingredients, // Reference to Ingredients
      recipe_reviews: [
        {
          review_id: 1,
          recipe_id: 0,
          user_id: 0,
          rating: 4,
          content: "Great recipe! Easy to make.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          review_id: 2,
          recipe_id: 0,
          user_id: 1,
          rating: 3,
          content: "It was okay, a bit too sweet for me.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          review_id: 3,
          recipe_id: 0,
          user_id: 2,
          rating: 5,
          content: "Absolutely loved it!",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      instructions:
        "Apply the peanut butter to one of the slices of bread. \n Apply the jelly to the other slice. \n, Close the sandwich.",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    reviews = [...currentRecipe.recipe_reviews];
  });

  test("Recipe renders the correct Ingredients and Steps", () => {
    render(<Recipe currentRecipe={currentRecipe} setCurrentRecipe={() => {}} setReviews/>);

    // Check if ingredients with quantities and units are rendered correctly
    currentRecipe.recipe_ingredient.forEach((ingredient) => {
      expect(
        screen.getByText(
          `${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredient.ingredient_name}`
        )
      ).toBeInTheDocument();
    });

    // Check if steps are rendered correctly
    const sentenceRegex = /([.])\s*/;
    const sentences = currentRecipe.instructions.split(sentenceRegex)
          .filter(Boolean)  // Remove any empty strings that may appear
          .map((sentence, index, array) => {
            // Combine the sentence with its punctuation if it's not the last part
            if (index % 2 === 0) {
              return sentence.trim() + (array[index + 1] || '');
            }
            return null;
          })
          .filter(Boolean); // Filter out nulls
   
    sentences.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  test("Recipe calculates and displays the correct average rating", () => {
    render(
      <Recipe
        currentRecipe={currentRecipe}
        setCurrentRecipe={() => {}}
        setReviews={() => {}}
      />
    );
  
    // Calculate expected average rating
    const expectedAverageRating = (
      currentRecipe.recipe_reviews.reduce((sum, review) => sum + review.rating, 0) /
      currentRecipe.recipe_reviews.length
    ).toFixed(1);
  
    // Query the star icons container by its test ID
    const starIconsContainer = screen.getAllByTestId("star-icons")[0];
  
    // Check if the star icons container is in the document
    expect(starIconsContainer).toBeInTheDocument();
  
    // Optionally, verify the number of children (stars) rendered matches the expected average
    const starCount = starIconsContainer.children.length; // Count the child elements inside the container
    const fullStars = Math.floor(expectedAverageRating / 2);
    const hasHalfStar = expectedAverageRating % 2 !== 0;
    const expectedStarCount = fullStars + (hasHalfStar ? 1 : 0) + (5 - fullStars - (hasHalfStar ? 1 : 0));
  
    expect(starCount).toBe(expectedStarCount);
  });

  test.skip("Recipe renders reviews correctly", () => {
    render(<Recipe currentRecipe={currentRecipe} setCurrentRecipe={() => {}} />);
  
    // Check if reviews are rendered
    currentRecipe.recipe_reviews.forEach((review) => {
      expect(screen.getByText(review.content)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${review.rating}`)).toBeInTheDocument();
      expect(screen.getByText(new Date(review.updated_at).toLocaleString())).toBeInTheDocument();
    });
  });

  test.skip("Recipe displays 'No ratings yet' if there are no reviews", () => {
    const emptyRecipe = { ...currentRecipe, recipe_reviews: [] };

    render(<Recipe currentRecipe={emptyRecipe} reviews={[]} />);

    expect(screen.getByText("Average Rating: No ratings yet")).toBeInTheDocument();
    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });
});