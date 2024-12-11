import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function LoginWidget() { // TODO: route back to home page on sign out
    const { data: session } = useSession();
    const router = useRouter();

    function onSignOut() {
        // If already authenticated, redirect to the home page
        if (session) {
            signOut();
            router.push("/");
        }
    }

    if (session) {
        return (<div>
            <Button type="button" onClick={() => onSignOut()}
                sx={{
                    backgroundColor: "#201f54",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#3f3d89",
                    }
                }}>
                Sign Out
            </Button>
        </div>);
    }
    return (<div>
        <Button type="button" onClick={() => signIn("google")}
            sx={{
                backgroundColor: "#201f54",
                color: "white",
                "&:hover": {
                    backgroundColor: "#3f3d89",
                }
            }}>
            Sign In
        </Button>
    </div>);
}
