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
  useTheme
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
  const theme = useTheme();

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
    if (!formData.servings || formData.servings <= 0)
      newErrors.servings = "Servings must be greater than 0";
    if (!formData.ingredients.length || formData.ingredients.every((i) => i.trim() === ""))
      newErrors.ingredients = "At least one ingredient is required";
    if (!formData.steps.length || formData.steps.every((s) => s.trim() === ""))
      newErrors.steps = "At least one cooking step is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      // eslint-disable-next-line no-alert
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setFormData((prev) => ({...prev, image: "" }));
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
          sx={{ color: "primary.main", fontWeight: 700 }}
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
              label="Recipe Title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
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
          <Typography variant="h6">Ingredients</Typography>
          {formData.ingredients.map((ingredient, index) => (
          <Box key={`${ingredient}-${index}`} display="flex" alignItems="center" mb={1}>


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
              <Box key={`${step}-${index}`} display="flex" alignItems="center" mb={1}>

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
    </Box>
  );
}

Editor.propTypes = {
  currentRecipe: RecipeShape,
  complete: PropTypes.func.isRequired,
};
