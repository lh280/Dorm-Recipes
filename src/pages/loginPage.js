import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/material/theme";
import Head from "next/head";
import Header from "@/components/Header";

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // If already authenticated, redirect to the home page
        if (status === "authenticated") {
            router.push("/");
        } else if (status !== "loading") {
            // Initiate Google Sign-In
            signIn("google");
        } else {
            router.push("/");
        }
    }, [session, status, router]);

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
                    <Header setCurrentRecipe={null} currentUser={null} viewAccount={null} />
                </main>
            </ThemeProvider>
        </div>
    );
}