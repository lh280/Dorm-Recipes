/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import {useState} from "react";


export default function App(appProps) {
  const { Component, pageProps } = appProps;
  const router = useRouter();
  const [currentRecipe, setCurrentRecipe] = useState(null); 
  const [userInfo, setUserInfo] = useState(null);

  function viewAccount(id) {
    const addr = id !== undefined ? `/users/${id.toString()}`:"/";
    router.push(addr);
    if (id !== undefined){
      fetch(`/api/users/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error("GET user/id response fail");
        }
        return res.json();
      }).then((rec) => {
        setUserInfo(rec);
      });
    }
   
  }

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

  const currentUser = {user_id:0,email:"test@gmail.com",created_at:"21 Jan 2024 00:00:00 GMT"}

  const props = {
    ...pageProps,
    currentRecipe,
    currentUser,
    setCurrentRecipe: setCurrentRec,
    viewAccount,
    userInfo
  };

  return (<AppCacheProvider {...appProps}><Component {...props} /></AppCacheProvider>);
}

/* App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
}; */
