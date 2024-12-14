import { signIn, signOut, useSession } from "next-auth/react";
import { Button, useTheme, useMediaQuery } from "@mui/material";

export default function LoginWidget() { // TODO: route back to home page on sign out
    const { data: session } = useSession();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (session) {
        return (<div>
            <Button type="button" onClick={signOut}
                sx={{
                    backgroundColor: "#201f54",
                    color: "white",
                    fontSize: isMobile ? "0.7rem" : "1rem",
                    minWidth: "80px",
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
                fontSize: isMobile ? "0.7rem" : "1rem",
                minWidth: "80px",
                "&:hover": {
                    backgroundColor: "#3f3d89",
                }
            }}>
            Sign In
        </Button>
    </div>);
}