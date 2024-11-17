import { createRouter } from "next-connect";
import User from "../../../../models/User";
import { onError } from "../../../lib/middleware";

const router = createRouter();

router
  .get(async (req, res) => {
    const recipe = await User.query()
      .findById(req.query.id)
      .withGraphFetched("related")
      .throwIfNotFound();
    res.status(200).json(recipe);
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