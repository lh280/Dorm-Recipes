import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Home.module.css";
import RecipeShape from "./RecipeShape";

export default function Editor({ currentRecipe, complete }) {
    const [title, setTitle] = useState(currentRecipe?.title || "");
    const [description, setDescription] = useState(currentRecipe?.description || "");
    const [ingredients, setIngredients] = useState(currentRecipe?.ingredients || []);
    const [time, setTime] = useState(currentRecipe?.time || 0);
    const [steps, setSteps] = useState(currentRecipe?.steps || []);

    // Update state if currentRecipe changes
    useEffect(() => {
        setTitle(currentRecipe?.title || "");
        setDescription(currentRecipe?.description || "");
        setIngredients(currentRecipe?.ingredients || "");
        setTime(currentRecipe?.time || 0);
        setSteps(currentRecipe?.steps || "");
      }, [currentRecipe]);

      const handleSave = () => {
        complete({
          id: currentRecipe?.id, // Retain id for editing, undefined for new recipes
          authorId: currentRecipe?.authorId,
          title,
          description,
          time,
          ingredients,
          steps,
          edited: new Date().toISOString(), // Add timestamp for edited recipes
        });
      };
    
      return (
        <div className={styles.editor}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            required
          />
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter recipe time"
            required
          />
          <textarea
            value={ingredients.join(", ")}
            onChange={(e) => setIngredients(e.target.value.split(",").map((item) => item.trim()))}
            placeholder="Enter ingredients (comma-separated)"
            required
          />
          <textarea
            value={steps.join("\n")}
            onChange={(e) => setSteps(e.target.value.split("\n").map((item) => item.trim()))}
            placeholder="Enter cooking steps (one per line)"
            required
          />
          <button type="button" onClick={handleSave} disabled={!title}>
            Save
          </button>
          <button type="button" onClick={() => complete()}>
            Cancel
          </button>
        </div>
      );
    }
    
    Editor.propTypes = {
      currentRecipe: RecipeShape,
      complete: PropTypes.func.isRequired,
    };  

