/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";

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

const tempRatings = [
  {
    id: 0,
    recId: 0,
    userId: 0,
    value: 2,
  },
  {
    id: 0,
    recId: 0,
    userId: 1,
    value: 3,
  },
  {
    id: 0,
    recId: 0,
    userId: 2,
    value: 4,
  },
];

export default function App(appProps) {
  const { Component, pageProps } = appProps;
  const router = useRouter();
  // TODO: route to different recipes (once using DB)
  // const { id } = router.query;
  const currentRecipe = tempRecipe;
  const ratings = tempRatings;
  function setCurrentRecipe(recipe) {
    const addr =
      recipe !== undefined ? `/recipes/${recipe.id.toString()}` : "/";
    router.push(addr);
  }
  const props = {
    ...pageProps,
    currentRecipe,
    setCurrentRecipe,
    ratings,
  };
  return (<AppCacheProvider {...appProps}><Component {...props} /></AppCacheProvider>);
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
