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
            let newIngredient = await Ingredient.query().findOne({
                ingredient_name: name
            });
            if (!newIngredient) {
                newIngredient = await Ingredient.query().insert({
                ingredient_name: name
            })};
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