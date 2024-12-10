import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function LoginWidget() {
    const { data: session } = useSession();

    if (session) {
        return (<div>
            <Button type="button" onClick={signOut}
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
