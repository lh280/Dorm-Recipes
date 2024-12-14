import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image"
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";

import RecipeShape from "./RecipeShape";

export default function Editor({ currentRecipe, complete }) {
  const [formData, setFormData] = useState({
    title: currentRecipe?.title || "",
    description: currentRecipe?.description || "",
    time: currentRecipe?.time || "",
    servings: currentRecipe?.servings || "",
    steps: Array.isArray(currentRecipe?.instructions)
      ? currentRecipe?.instructions
      : currentRecipe?.instructions?.split("\n") || [],
    ingredients: currentRecipe?.ingredients || [],
    image: currentRecipe?.image || "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      title: currentRecipe?.title || "",
      description: currentRecipe?.description || "",
      time: currentRecipe?.time || "",
      steps: Array.isArray(currentRecipe?.instructions)
        ? currentRecipe?.instructions
        : currentRecipe?.instructions?.split("\n") || [],
      ingredients: currentRecipe?.ingredients || [],
      image: currentRecipe?.image || "",
    });
  }, [currentRecipe]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "", unit: "" }],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => {
      const ingredients = [...prev.ingredients];
      ingredients[index] = { ...ingredients[index], [field]: value };
      return { ...prev, ingredients };
    });
    // Clear error if valid input is provided
    if (
      errors.ingredients &&
      formData.ingredients.every(
        (ingredient) =>
          ingredient.name.trim() !== "" && ingredient.quantity && ingredient.unit
      )
    ) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.ingredients;
        return newErrors;
      });
    }
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const handleRemoveStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleStepChange = (index, value) => {
    setFormData((prev) => {
      const steps = [...prev.steps];
      steps[index] = value;
      return { ...prev, steps };
    });
    // Clear error if valid input is provided
    if (errors.steps && value.trim() !== "") {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (formData.steps.every((step) => step.trim() !== "")) {
          delete newErrors.steps;
        }
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.time || formData.time <= 0)
      newErrors.time = "Preparation time must be greater than 0";
    if (!formData.servings || formData.servings <= 0)
      newErrors.servings = "Servings must be greater than 0";

    // Validate Ingredients
    if (
      !formData.ingredients.length ||
      formData.ingredients.some(
        (ingredient) => !ingredient.name.trim() || !ingredient.quantity || !ingredient.unit
      )
    ) {
      newErrors.ingredients = "Each ingredient must have a name, quantity, and unit.";
    }
    if (!formData.steps.length || formData.steps.every((s) => s.trim() === ""))
      newErrors.steps = "At least one cooking step is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const MAX_IMAGE_SIZE_MB = 5;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      // eslint-disable-next-line no-alert
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      // eslint-disable-next-line no-alert
      alert(`Image size must be less than ${MAX_IMAGE_SIZE_MB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setIsSaving(true);
    complete({
      id: currentRecipe?.id,
      authorId: currentRecipe?.authorId,
      title: formData.title,
      description: formData.description,
      time: formData.time,
      servings: formData.servings,
      steps: formData.steps,
      ingredients: formData.ingredients,
      image: formData.image,
      edited: new Date().toISOString(),
    });
    setIsSaving(false);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef)",
        minHeight: "100vh",
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        elevation={6}
        sx={{
          padding: 6,
          maxWidth: 800,
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        }}
      >

        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{ color: '#201f54', fontWeight: 700 }}
        >
          Add a New Recipe
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{ marginBottom: 3, color: "text.secondary" }}
        >
          Make your dish shine with the perfect recipe details.
        </Typography>

        <Divider sx={{ marginBottom: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Recipe Title*"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              error={!!errors.title}
              helperText={errors.title || "Enter a descriptive title for your recipe."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description*"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description || "Provide a detailed description."}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Preparation Time (minutes)"
              type="number"
              fullWidth
              value={formData.time}
              onChange={(e) => handleInputChange("time", Math.max(1, e.target.value))}
              error={!!errors.time}
              helperText={errors.time}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Servings"
              type="number"
              fullWidth
              value={formData.servings}
              onChange={(e) => handleInputChange("servings", Math.max(1, e.target.value))}
              error={!!errors.servings}
              helperText={errors.servings}
              required
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Typography variant="h6">Recipe Image</Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<ImageIcon />}
                sx={{ bgcolor: '#201f54' }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {formData.image && (
                <>
                  <Image
                    src={formData.image}
                    alt="Uploaded Recipe"
                    width={100}
                    height={100}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={handleClearImage}
                    sx={{ color: "red", ml: 1 }}
                  >
                    <ClearIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Typography variant="caption" color="textSecondary">
              Optional, but highly recommended.
            </Typography>
          </Grid>

          {/* Ingredients */}
          <Grid item xs={12}>
            <Typography variant="h6">
              Ingredients <Typography component="span" color="error">*</Typography>
            </Typography>
            {formData.ingredients.map((ingredient, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} display="flex" alignItems="flex-start" gap={2} mb={1} sx={{ flexWrap: "wrap" }}>
                <TextField
                  label="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  error={!!errors.ingredients && !ingredient.name.trim()}
                  helperText={
                    !!errors.ingredients &&
                    !ingredient.name.trim() &&
                    "Name is required"
                  }
                />
                <TextField
                  label="Quantity"
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  placeholder="Quantity"
                  error={!!errors.ingredients && !ingredient.quantity}
                  helperText={
                    !!errors.ingredients &&
                    !ingredient.quantity &&
                    "Quantity is required"
                  }
                />
                <TextField
                  label="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                  placeholder="Unit"
                  error={!!errors.ingredients && !ingredient.unit.trim()}
                  helperText={
                    !!errors.ingredients && !ingredient.unit.trim() && "Unit is required"
                  }
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveIngredient(index)}
                  sx={{ ml: 1 }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            {errors.ingredients && (
              <Typography color="error" variant="caption">
                {errors.ingredients}
              </Typography>
            )}
            <Button
              variant="text"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddIngredient}
              sx={{ color: '#201f54' }}
            >
              Add Ingredient
            </Button>
          </Grid>


          {/* Cooking Steps */}
          <Grid item xs={12}>
            <Typography variant="h6">
              Cooking Steps <Typography component="span" color="error">*</Typography>
            </Typography>
            {formData.steps.map((step, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <TextField
                  fullWidth
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  error={!!errors.steps && step.trim() === ""}
                  helperText={!!errors.steps && step.trim() === "" && "Step cannot be empty"}
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveStep(index)}
                  sx={{ ml: 1 }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            {errors.steps && (
              <Typography color="error" variant="caption">
                {errors.steps}
              </Typography>
            )}
            <Button
              variant="text"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddStep}
              sx={{ color: '#201f54' }}
            >
              Add Step
            </Button>
          </Grid>


          {/* Buttons */}
          <Grid item xs={12} textAlign="center">
            <Tooltip title="Save your recipe">
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={isSaving}
                startIcon={isSaving && <CircularProgress size={20} />}
                sx={{ marginRight: 2, bgcolor: '#201f54' }}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </Tooltip>
            <Tooltip title="Cancel and return">
              <Button variant="outlined" sx={{ borderColor: '#201f54', color: '#201f54' }} onClick={() => complete()}>
                Cancel
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}

Editor.propTypes = {
  currentRecipe: RecipeShape,
  complete: PropTypes.func.isRequired,
};
