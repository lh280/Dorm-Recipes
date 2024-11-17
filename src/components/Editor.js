import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Home.module.css";

export default function Editor({ currentRecipe, complete }) {
    const [title, setTitle] = useState(currentRecipe?.title || "");
    const [description, setDescription] = useState(currentRecipe?.description || "");
    const [ingredients, setIngredients] = useState(currentRecipe?.ingredients || "");
    const [steps, setSteps] = useState(currentRecipe?.steps || "");

    // Update state if currentRecipe changes
    useEffect(() => {
        setTitle(currentRecipe?.title || "");
        setDescription(currentRecipe?.description || "");
        setIngredients(currentRecipe?.ingredients || "");
        setSteps(currentRecipe?.steps || "");
      }, [currentRecipe]);

      const handleSave = () => {
        complete({
          id: currentRecipe?.id, // Retain id for editing, undefined for new recipes
          title,
          description,
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
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma-separated)"
            required
          />
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Enter cooking steps"
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
      currentRecipe: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        ingredients: PropTypes.string,
        steps: PropTypes.string,
        edited: PropTypes.string,
      }),
      complete: PropTypes.func.isRequired,
    };  

