import { createRouter } from "next-connect";
import onError from "@/lib/middleware";
import Ingredient from "../../../../models/Ingredient";

/* eslint-disable consistent-return */
const router = createRouter();

router
    .post(async (req, res) => {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            const existingIngredient = await Ingredient.query().findOne({
                ingredient_name: name,
              });
            
            if (existingIngredient) {
            return res.status(200).json(existingIngredient);
            }

            // Get the current max ingredient_id and increment
            const maxIngredient = await Ingredient.query().max("ingredient_id as max_id").first();
            const newIngredientId = (maxIngredient?.max_id || 0) + 1;

            const newIngredient = await Ingredient.query().insert({
                ingredient_id: newIngredientId,
                ingredient_name: name,
            });
            if (!newIngredient) {
                return res.status(500).json({ error: "Ingredient Not Created" });
            }
        return res.status(201).json(newIngredient);
        } catch (error) {
        // eslint-disable-next-line no-console
            console.error(error);
            res.status(500).json({ error: "Failed to create Ingredient" });
        }
    })
    
export default router.handler({ onError });