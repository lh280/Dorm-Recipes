/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: { main: "#556cd6" },
    secondary: { main: "#19857b" },
    error: { main: "#f44336" },
  },
  typography: {
    fontFamily: lexend.style.fontFamily,
  },
});

export default function App(appProps) {
  const { Component, pageProps } = appProps;
  const router = useRouter();
  const [currentRecipe, setCurrentRecipe] = useState(null); 
  
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
    viewAccount
  };

  return (
    <ThemeProvider theme={theme}>
      <AppCacheProvider {...appProps}>
        <Component {...props} />
      </AppCacheProvider>
    </ThemeProvider>
  );
}