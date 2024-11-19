import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css"; 

export default function DeleteRecipe() {
  const router = useRouter();
  const { id } = router.query; 

  const handleDelete = () => {
    if (id) {
      fetch(`/api/recipes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete recipe");
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-alert
          alert("Recipe deleted successfully");
          router.push("/recipes");
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error deleting recipe:", error);
        });
    } else {
      router.back(); // Go back if no id found
    }
  };

  return (
    <div className={styles.container}>
      <main>
        <h1 className="title">Delete Recipe</h1>
        <p>Are you sure you want to delete this recipe?</p>
        <button type="button" onClick={handleDelete} style={{ marginRight: "10px" }}>
          Yes, Delete
        </button>
        <button type="button" onClick={() => router.back()}>Cancel</button>
      </main>
      <footer>Recipe App</footer>
    </div>
  );
}