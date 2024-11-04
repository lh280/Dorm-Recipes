/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import "@/styles/globals.css";

const tempRecipe = {
  id: 0,
  img: "/pbj.jpg",
  title: "PB & J Sandwich",
  author: "Noah Price",
  time: "< 15 minutes",
  rating: "3.5 out of 5",
  ingredients: [
    "2 slices of bread",
    "1 jar of peanut butter",
    "1 jar of jelly",
  ],
  steps: [
    "Apply the peanut butter to one of the slices of bread.",
    "Apply the jelly to the other slice.",
    "Close the sandwich.",
  ],
  edited: "2024-11-02",
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // TODO: route to different recipes (once using DB)
  // const { id } = router.query;
  const currentRecipe = tempRecipe;
  function setCurrentRecipe(recipe) {
    const addr =
      recipe !== undefined ? `/recipes/${recipe.id.toString()}` : "/";
    router.push(addr);
  }
  const props = {
    ...pageProps,
    currentRecipe,
    setCurrentRecipe,
  };
  return <Component {...props} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
