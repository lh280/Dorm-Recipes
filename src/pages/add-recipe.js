import { useRouter } from "next/router";
import Editor from "@/components/Editor";
import styles from "@/styles/Home.module.css"; 

export default function AddRecipe() {
  const router = useRouter();

  const handleComplete = (recipe) => {
    if (recipe) {
      fetch("/api/saveRecipe", {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save recipe");
          return response.json();
        })
        .then((newRecipe) => {
          alert("Recipe saved successfully!");
          router.push(`/recipes/${newRecipe.id}`);
        })
        .catch((error) => {
          console.error("Error saving recipe:", error);
        });
    } else {
      router.back(); // Go back if canceled
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <h1 className="title">Add a New Recipe</h1>
        <Editor complete={handleComplete} />
      </main>
      <footer>Recipe App</footer>
    </div>
  );
}