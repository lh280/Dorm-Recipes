/**
 * 
 * Login Page for the app
 * Currently not routed too, might be unnecessary
 * 
 */

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";
import Head from "next/head";
import { useRouter } from "next/router";

// eslint-disable-next-line react/prop-types
export default function Login({ router }) {
    const { data: session, status } = useSession();
    const newRouter = useRouter();
    const currentRouter = !router ? router : newRouter;

    useEffect(() => {
        setTimeout(() => {
            // If already authenticated, redirect to the home page
            if (status === "authenticated") {
                currentRouter.push("/");
            } else if (status !== "loading") {
                // Initiate Google Sign-In
                signIn("google");
            } else {
                currentRouter.push("/");
            }
        }, 5000);
    }, [session, status, currentRouter]);

    return (
        <div>
            <Head>
                <title>Dorm Recipes</title>
                <meta name="Dorm Recipes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main style={{ paddingTop: '80px' }}>
                    <Toolbar sx={{
                        bgcolor: '#201f54',
                        paddingY: 2,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100px',
                        margin: '0 auto',
                        width: '100%',
                        zIndex: 1100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                cursor: "pointer",
                                color: "white",
                                marginRight: 4
                            }}
                        >
                            Dorm Recipes
                        </Typography>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                cursor: "pointer",
                                color: "white",
                                marginRight: 66
                            }}
                        >
                            Loading...Take a snack break!
                        </Typography>
                    </Toolbar>
                </main>
            </ThemeProvider>
        </div>
    );
}