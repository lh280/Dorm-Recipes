/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/global.css';

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
  
  const id = +router.query.id;
  const route = router.pathname;

  useEffect(() => {
    if (route === "/recipes/[[...id]]") {
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
    if (route === "/users/[[...id]]") {
      if (id || id === 0){
        fetch(`/api/users/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("GET user/id response fail");
            }
            return res.json();
          }).then((rec) => {
            setUserInfo(rec);
          });
      }
    }
  }, [id,route]);

  function setCurrentRec(recId) {
    const addr =
      recId !== undefined ? `/recipes/${recId.toString()}` : "/";
    router.push(addr);
  }

  function viewAccount(usrId) {
    const addr = usrId !== undefined ? `/users/${usrId.toString()}`:"/";
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