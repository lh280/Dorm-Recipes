import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css"; 

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      steps,
    };

    try {
      const response = await fetch("/api/saveRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        alert("Recipe saved successfully!");
      
        setTitle("");
        setDescription("");
        setIngredients("");
        setSteps("");
      } else {
        console.error("Failed to save recipe");
        alert("Failed to save recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Add Recipe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.description}>Add a New Recipe</h1>
        <form onSubmit={handleSubmit} className={styles.grid}>
          <div className={styles.card}>
            <label>
              Recipe Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.card}>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.card}>
            <label>
              Ingredients:
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.card}>
            <label>
              Steps:
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
                className={styles.input}
              />
            </label>
          </div>
          <button type="submit" className={styles.card}>Submit Recipe</button>
        </form>
      </main>
    </>
  );
}
