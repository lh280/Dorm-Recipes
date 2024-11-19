/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import {useState} from "react";


export default function App(appProps) {
  const { Component, pageProps } = appProps;
  const router = useRouter();
  const [currentRecipe, setCurrentRecipe] = useState(null);

  function setCurrentRec(id) {
    const addr =
      id !== undefined ? `/recipes/${id.toString()}` : "/";
    router.push(addr);

    if (id || id === 0) { // (id !== null) does not work here. Open to suggestions.
    fetch(`/api/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("currentRecipe response fail");
        }
        return response.json();
      })
      .then((rec) => {
        setCurrentRecipe(rec);
      });
    } else {
      setCurrentRecipe();
    }
  }

  const props = {
    ...pageProps,
    currentRecipe,
    setCurrentRecipe: setCurrentRec
  };

  return (<AppCacheProvider {...appProps}><Component {...props} /></AppCacheProvider>);
}

/* App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
}; */
