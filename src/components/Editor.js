import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/Editor.module.css";
import RecipeShape from "./RecipeShape";

export default function Editor({ currentRecipe, complete }) {
  const [title, setTitle] = useState(currentRecipe?.title || "");
  const [description, setDescription] = useState(currentRecipe?.description || "");
  const [time, setTime] = useState(currentRecipe?.time || 0);
  const [steps, setSteps] = useState(
    Array.isArray(currentRecipe?.instructions)
      ? currentRecipe?.instructions
      : currentRecipe?.instructions?.split("\n") || []
  );
  const [image, setImage] = useState(currentRecipe?.image || ""); // Store Base64 image string

  useEffect(() => {
    setTitle(currentRecipe?.title || "");
    setDescription(currentRecipe?.description || "");
    setTime(currentRecipe?.time || 0);
    setSteps(
      Array.isArray(currentRecipe?.instructions)
        ? currentRecipe?.instructions
        : currentRecipe?.instructions?.split("\n") || []
    );
    setImage(currentRecipe?.image || ""); // Set image if available
  }, [currentRecipe]);

  const handleSave = () => {
    complete({
      id: currentRecipe?.id,
      authorId: currentRecipe?.authorId,
      title,
      description,
      time,
      steps,
      image,
      edited: new Date().toISOString(),
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(",")[1]); // Store only the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <h1 className={styles.formTitle}>Add a New Recipe</h1>
      <form>
        <input
          type="text"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          required
        />
        <textarea
          className={styles.textareaField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description"
          required
        />
        <input
          type="number"
          className={styles.inputField}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter preparation time (minutes)"
          required
        />
        <textarea
          className={styles.textareaField}
          value={Array.isArray(steps) ? steps.join("\n") : ""}
          onChange={(e) =>
            setSteps(
              e.target.value.split("\n").map((item) => item.trim())
            )
          }
          placeholder="Enter cooking steps (one per line)"
          required
        />
        {/* Image upload field */}
        <div className={styles.inputField}>
          <label htmlFor="imageUpload" className={styles.fileInputLabel}>
            Upload Image (optional)
          </label>
          <input
            type="file"
            id="imageUpload"
            onChange={handleImageChange}
            accept="image/*"
          />
          </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!title}
          >
            Save
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => complete()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

Editor.propTypes = {
  currentRecipe: RecipeShape,
  complete: PropTypes.func.isRequired,
};
