import { createRouter } from "next-connect";
import Review from "../../../../models/Review";
import onError from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const reviewID = parseInt(req.query.id, 10);
    try {
      const review = await Review.query()
        .where('review_id', reviewID)
        .first()
        .throwIfNotFound();
      res.status(200).json(review);
    } catch (error) {
      res.status(404).json({ error: "Review not found" });
    }
  })

  .put(async (req, res) => {
    // PUT endpoint for editing a single review
    try {
      const { review_id, content, rating, recipe_id, id } = req.body;
      if (review_id !== parseInt(req.query.id, 10)) {
        res.status(400).end(`URL and review ID do not match`);
        return;
      }
      const updatedRecord = await Review.query().updateAndFetchById(
        review_id,
        {content,
        rating,
        recipe_id,
        id,
        updated_at: new Date().toISOString(),
        });
      res.status(200).json(updatedRecord);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to update the review" });
    }
  })

  .delete(async (req, res) => {
    const reviewID = parseInt(req.query.id, 10);
    try {
      // check if recipe exists before deletion
      const review = await Review.query()
        .where('review_id', reviewID)
        .first()
        .throwIfNotFound();
        res.status(200).json(review);
      } catch (error) {
        res.status(404).json({ error: "Review not found" });
      }

    try {
      // delete the recipe
      await Review.query()
        .delete()
        .where('review_id', reviewID)
        .throwIfNotFound();
      res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to delete the review" });
    }
  });

export default router.handler({ onError });
