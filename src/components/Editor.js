import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

import RecipeShape from "./RecipeShape";

export default function Editor({ currentRecipe, complete }) {
  const [formData, setFormData] = useState({
    title: currentRecipe?.title || "",
    description: currentRecipe?.description || "",
    time: currentRecipe?.time || "",
    steps: Array.isArray(currentRecipe?.instructions)
      ? currentRecipe?.instructions
      : currentRecipe?.instructions?.split("\n") || [],
    ingredients: currentRecipe?.ingredients || [],
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
    });
  }, [currentRecipe]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleIngredientChange = (index, value) => {
    setFormData((prev) => {
      const ingredients = [...prev.ingredients];
      ingredients[index] = value;
      return { ...prev, ingredients };
    });
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
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.time || formData.time <= 0)
      newErrors.time = "Preparation time must be greater than 0";
    if (!formData.ingredients.length || formData.ingredients.every((i) => i.trim() === ""))
      newErrors.ingredients = "At least one ingredient is required";
    if (!formData.steps.length || formData.steps.every((s) => s.trim() === ""))
      newErrors.steps = "At least one cooking step is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      steps: formData.steps,
      ingredients: formData.ingredients,
      edited: new Date().toISOString(),
    });
    setIsSaving(false);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 700,
        margin: "auto",
        background: "#f9f9f9",
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add a New Recipe
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Grid container spacing={2}>
        {/* Recipe Details */}
        <Grid item xs={12}>
          <TextField
            label="Recipe Title"
            fullWidth
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Recipe Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            required
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

        {/* Ingredients */}
        <Grid item xs={12}>
          <Typography variant="h6">Ingredients</Typography>
          {formData.ingredients.map((ingredient, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                fullWidth
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
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
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </Button>
        </Grid>

        {/* Cooking Steps */}
        <Grid item xs={12}>
          <Typography variant="h6">Cooking Steps</Typography>
          {formData.steps.map((step, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                fullWidth
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
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
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddStep}
          >
            Add Step
          </Button>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} textAlign="center">
          <Tooltip title="Save your recipe">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isSaving}
              startIcon={isSaving && <CircularProgress size={20} />}
              sx={{ marginRight: 2 }}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </Tooltip>
          <Tooltip title="Cancel and return">
            <Button variant="outlined" color="secondary" onClick={() => complete()}>
              Cancel
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}

Editor.propTypes = {
  currentRecipe: RecipeShape,
  complete: PropTypes.func.isRequired,
};
