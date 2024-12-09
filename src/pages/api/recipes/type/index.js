import { createRouter } from "next-connect";
import Recipe from "../../../../../models/Recipe";
import onError from "../../../../lib/middleware";

const router = createRouter();

router
    .get(async (req, res) => {
        try {
            const recipes = await Recipe.query().orderBy("created_at", "DESC")
            if (recipes.length === 0) {
                return res.status(404).json({ message: "No recipes found" });
            }
            // This line is running so it might just work 
            return res.status(202).json(recipes);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return res.status(500).json({ error: "Failed to fetch recipes." });
    }
    })

export default router.handler({ onError });
