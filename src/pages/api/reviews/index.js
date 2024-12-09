import { createRouter } from "next-connect";
import Review from "../../../../models/Review";
import onError from "../../../lib/middleware";

/* eslint-disable consistent-return */

const router = createRouter();

router
    .post(async (req, res) => {
        const { recipe_id, user_id, content, rating } = req.body;

        if (recipe_id === null || user_id === null || !content || !rating) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        try {
            const newReview = await Review.query().insert({
              recipe_id,
              user_id,
              content,
              rating,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
        });
        return res.status(201).json(newReview);
        } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        res.status(500).json({ error: "Failed to create review" });
        }
    })

    .put(async (req, res) => {
        const { review_id, content, rating } = req.body;

        if (!review_id || !content || !rating) {
          return res.status(400).json({ error: "Missing required fields" });
        }
      
        try {
          const updated_at = new Date().toISOString();
          const updatedReview = await Review.query()
            .patchAndFetchById(review_id, { content, rating, updated_at })
            .throwIfNotFound();
      
          return res.status(200).json(updatedReview);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          res.status(500).json({ error: "Failed to update review" });
        }
    })

    .delete(async (req, res) => {
        const review_id = parseInt(req.query.id, 10);

        if (!review_id) {
            return res.status(400).json({ error: "Review ID is required" });
        }

        try {
            await Review.query().deleteById(review_id);
            return res.status(200).json({ success: true, message: "Review deleted successfully" });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            res.status(500).json({ error: "Failed to delete review" });
        }
    });

export default router.handler({ onError });
    