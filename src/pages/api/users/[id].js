/* eslint-disable consistent-return */

import { createRouter } from "next-connect";
import User from "../../../../models/User";
import onError from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const userID = parseInt(req.query.id, 10);
    try{
    const user = await User.query()
      .where('user_id', userID)
      .withGraphFetched('[user_recipes, pantry_items, user_reviews.[recipes(onlyTitle)]]') // Changed reviews to user_reviews
      .first()
      .throwIfNotFound();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json(user);

    } catch (error){
      // eslint-disable-next-line no-console
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .put(async (req, res) => {
    // PUT endpoint for editing a user's info
    try {
      const { id, ...updatedUser } = req.body;
      if (id !== parseInt(req.query.id, 10)) {
        res.status(400).end(`URL and object does not match`);
        return;
      }
      const updatedRecord = await User.query().updateAndFetchById(
        id,
        updatedUser,
      );
      res.status(200).json(updatedRecord);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

export default router.handler({ onError });