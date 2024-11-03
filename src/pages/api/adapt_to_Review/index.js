import { createRouter } from "next-connect";
import Rating from "../../../../models/Rating";
import { onError } from "../../../lib/middleware";

const router = createRouter();

router.post(async (req, res) => {
  const { recipe_id, rating, user_id, comment } = req.body;

  // Validate that required fields are present
  if (!recipe_id || !rating || !user_id) {
    res.status(400).json({ error: "Recipe ID, rating, and user ID are required." });
    return;
  }

  // Insert new rating
  const newRating = await Rating.query().insertAndFetch({
    recipe_id,
    rating,
    user_id,
    comment,
  });

  res.status(201).json(newRating);
});

export default router.handler({ onError });