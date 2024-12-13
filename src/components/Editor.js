import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

import RecipeShape from "./RecipeShape";

export default function Editor({ currentRecipe, complete }) {
  const [formData, setFormData] = useState({
    title: currentRecipe?.title || "",
    description: currentRecipe?.description || "",
    time: currentRecipe?.time || "",
    steps: Array.isArray(currentRecipe?.instructions)
      ? currentRecipe?.instructions
      : currentRecipe?.instructions?.split("\n") || [],
    ingredients: currentRecipe?.ingredients || [], // Add ingredients
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setFormData({
      title: currentRecipe?.title || "",
      description: currentRecipe?.description || "",
      time: currentRecipe?.time || "",
      steps: Array.isArray(currentRecipe?.instructions)
        ? currentRecipe?.instructions
        : currentRecipe?.instructions?.split("\n") || [],
      ingredients: currentRecipe?.ingredients || [], // Initialize ingredients
    });
  }, [currentRecipe]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.time || formData.time <= 0)
      newErrors.time = "Preparation time must be greater than 0";
    if (!formData.steps.length || formData.steps.every((step) => step.trim() === ""))
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
      ingredients: formData.ingredients, // Include ingredients
      edited: new Date().toISOString(),
    });
    setIsSaving(false);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        padding: theme.spacing(4),
        maxWidth: 600,
        margin: "auto",
        background: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add a New Recipe
      </Typography>
      <Grid container spacing={2}>
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
            onChange={(e) => handleInputChange("time", e.target.value)}
            error={!!errors.time}
            helperText={errors.time}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Ingredients (one per line)"
            fullWidth
            multiline
            rows={3}
            value={formData.ingredients.join("\n")}
            onChange={(e) =>
              handleInputChange(
                "ingredients",
                e.target.value.split("\n").map((item) => item.trim())
              )
            }
            placeholder="E.g., 2 Slices of Bread\n1 Jar of Peanut Butter"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Cooking Steps"
            fullWidth
            multiline
            rows={5}
            value={formData.steps.join("\n")}
            onChange={(e) =>
              handleInputChange(
                "steps",
                e.target.value.split("\n").map((item) => item.trim())
              )
            }
            error={!!errors.steps}
            helperText={errors.steps}
            placeholder="Step 1: Do this\nStep 2: Do that"
            required
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSaving}
            sx={{ marginRight: 2 }}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => complete()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

Editor.propTypes = {
  currentRecipe: RecipeShape,
  complete: PropTypes.func.isRequired,
};
