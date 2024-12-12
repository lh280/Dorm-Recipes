import { createRouter } from "next-connect";
import onError from "@/lib/middleware";
import Pantry from "../../../../models/Pantry";

/* eslint-disable consistent-return */

const router = createRouter();

router
    .post(async (req, res) => {
        const {user_id, ingredient_id, quantity, unit} = req.body;
        
        if (user_id === "" || ingredient_id === "" || quantity === "" || unit === "") {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const cleanQuantity = Number(quantity);
        try {
            const newPantryItem = await Pantry.query().insert({
                user_id,
                ingredient_id,
                quantity:cleanQuantity,
                unit
            });
        return res.status(201).json(newPantryItem);
        } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        res.status(500).json({ error: "Failed to create pantry Item" });
        }
    })
    
export default router.handler({ onError });