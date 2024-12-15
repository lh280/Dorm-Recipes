/* eslint-disable react/jsx-props-no-spreading */
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
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

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const id = +router.query.id;
  const route = router.pathname;

  useEffect(() => {
    if (route === "/recipes/[[...id]]") {
      if (id || id === 0) {
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

  const props = {
    ...pageProps,
    currentRecipe,
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