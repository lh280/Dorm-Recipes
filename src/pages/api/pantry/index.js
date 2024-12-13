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
        const cleanQuant = Number(quantity)
        try {
            const newPantryItem = await Pantry.query().insert({
                user_id,
                ingredient_id,
                quantity:cleanQuant,
                unit
            });
            return res.status(201).json(newPantryItem);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            res.status(500).json({ error: "Failed to create pantry Item" });
        }
    })
    .put(async (req, res) => {
       const {user_id, selectedIng, newQuantity, newUnit} = req.body;
        if (user_id === "" || selectedIng === "" || newQuantity === 0 || !newQuantity || newUnit === "") {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            const updatedRecord = await Pantry.query()
                .patch({quantity:newQuantity, unit:newUnit})
                .where("user_id", user_id)
                .where("ingredient_id", selectedIng);
            return res.status(201).json(updatedRecord)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            res.status(500).json({ error: "Failed to delete" })
        }
    })
    .delete(async (req, res) => {
        const {user_id, selectedIng} = req.body;
        if (user_id === "" || selectedIng === "") {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            await Pantry.query()
                .delete()
                .where("user_id", user_id)
                .where("ingredient_id", selectedIng);
            return res.status(201).json({body: "DELETED"})
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            res.status(500).json({ error: "Failed to delete" })
        }   
    })
    
export default router.handler({ onError });