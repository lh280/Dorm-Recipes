/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";

const theme = createTheme({
  typography: {
    fontFamily: 'Lexend, sans-serif',
  },
});

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // const { Component, pageProps } = appProps;
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
  }, [id, route]);

  function setCurrentRec(recId) {
    const addr =
      recId !== undefined ? `/recipes/${recId.toString()}` : "/";
    router.push(addr);
  }

  function viewAccount(usrId) {
    const addr = usrId !== undefined ? `/users/${usrId.toString()}` : "/";
    router.push(addr);
  }

  // eslint-disable-next-line no-constant-condition
  if (false) {
    // eslint-disable-next-line react/prop-types
    const authUser = { email: session.user.email };
    // eslint-disable-next-line no-unused-vars
    const currentUser = fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(authUser),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  // const currentUser = { id: 0, email: "test@gmail.com", created_at: "21 Jan 2024 00:00:00 GMT" }

  const props = {
    ...pageProps,
    currentRecipe,
    // currentUser,
    setCurrentRecipe: setCurrentRec,
    viewAccount
  };

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <AppCacheProvider {...pageProps}>
          <Component {...props} />
        </AppCacheProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};