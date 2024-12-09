/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Lexend, sans-serif',
  },
});

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
  
  const recId = +router.query.id;

  useEffect(() => {
    if (recId || recId === 0) { // (id !== null) does not work here. Open to suggestions.
      fetch(`/api/recipes/${recId}`)
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
  }, [recId]);

  function setCurrentRec(id) {
    const addr =
      id !== undefined ? `/recipes/${id.toString()}` : "/";
    router.push(addr);

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

  return (
    <ThemeProvider theme={theme}>
      <AppCacheProvider {...appProps}>
        <Component {...props} />
      </AppCacheProvider>
    </ThemeProvider>
  );
}